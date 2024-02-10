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
  userRepository,
} from "../repositories";
import { IUser } from "../types";
import { actionTokenService } from "./action-token.service";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";

class AdminService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
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

  public async signUpVerify(actionToken: string) {
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
}

export const adminService = new AdminService();
