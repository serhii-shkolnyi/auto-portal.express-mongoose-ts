import { Types } from "mongoose";

import {
  EAccountStatus,
  EAccountType,
  EActionTokenType,
  EEmailAction,
  EUserRole,
} from "../enums";
import { ApiError } from "../errors";
import {
  actionTokenRepository,
  roleRepository,
  tokenRepository,
  userRepository,
} from "../repositories";
import { ILogin, IToken, ITokenPair, ITokenPayload, IUser } from "../types";
import { actionTokenService } from "./action-token.service";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUpAdmin(dto: Partial<IUser>): Promise<IUser> {
    const role = await roleRepository.getOneByParams({
      role: EUserRole.ADMIN,
    });
    const adminFromDb = await userRepository.getOneByParams({
      _roleId: role._id,
    });
    if (adminFromDb) {
      throw new ApiError("User admin already exists", 400);
    }

    const hashedPassword = await passwordService.hash(
      dto.password,
      EUserRole.ADMIN,
    );

    const admin = await userRepository.create({
      ...dto,
      password: hashedPassword,
      _roleId: role._id,
    });

    const actionToken = actionTokenService.createActionToken(
      { userId: admin._id, roleId: role._id },
      EActionTokenType.ACTIVATE_ACCOUNT,
    );

    await Promise.all([
      actionTokenRepository.createActionToken({
        actionToken,
        _userId: admin._id,
        tokenType: EActionTokenType.ACTIVATE_ACCOUNT,
      }),
      emailService.sendMail(dto.email, EEmailAction.ACTIVATE_ACCOUNT, {
        userName: dto.userName,
        actionToken,
      }),
    ]);

    return admin;
  }

  public async signUpVerifyAdmin(actionToken: string) {
    const payload = actionTokenService.checkActionToken(
      actionToken,
      EActionTokenType.ACTIVATE_ACCOUNT,
    );
    if (!payload) {
      throw new ApiError("Not valid token", 400);
    }

    const entity = await actionTokenRepository.getActionTokenByParams({
      actionToken,
    });
    if (!entity) {
      throw new ApiError("Not valid token", 400);
    }

    const admin = await userRepository.getOneByParams({ _id: entity._userId });

    await Promise.all([
      userRepository.updateById(admin._id, {
        accountStatus: EAccountStatus.ACTIVE,
        accountType: EAccountType.PREMIUM,
      }),

      actionTokenRepository.deleteActionTokenByParams({ actionToken }),
    ]);
  }

  public async signInAdmin(dto: ILogin): Promise<ITokenPair> {
    const admin = await userRepository.getOneByParams({
      email: dto.email,
    });
    if (!admin) {
      throw new ApiError("Not valid email or password", 401);
    }

    const isMatch = await passwordService.compare(dto.password, admin.password);
    if (!isMatch) {
      throw new ApiError("Not valid email or password", 401);
    }

    const role = await roleRepository.getOneByParams({
      _id: admin._roleId,
    });
    if (role.role !== EUserRole.ADMIN) {
      throw new ApiError("You are not admin", 401);
    }

    if (admin.accountStatus !== EAccountStatus.ACTIVE) {
      throw new ApiError("You are not activate account", 401);
    }

    const jwtTokens = tokenService.generateTokenPair({
      userId: admin._id,
      roleId: role._id,
    });
    await tokenRepository.create({ ...jwtTokens, _userId: admin._id });

    return jwtTokens;
  }

  public async logoutAllAdmin(dto: Partial<IToken>): Promise<void> {
    await tokenRepository.deleteManyByParams({ _userId: dto._userId });
  }

  public async refreshAdmin(
    jwtPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });

    const jwtTokens = tokenService.generateTokenPair({
      userId: jwtPayload.userId,
      roleId: jwtPayload.roleId,
    });
    await tokenRepository.create({
      ...jwtTokens,
      _userId: new Types.ObjectId(jwtPayload.userId),
    });

    return jwtTokens;
  }
}

export const authService = new AuthService();
