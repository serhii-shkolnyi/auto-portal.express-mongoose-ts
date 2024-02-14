import { NextFunction, Request, Response } from "express";

import { ETokenType, EUserRole } from "../enums";
import { ApiError } from "../errors";
import { roleRepository, tokenRepository } from "../repositories";
import { tokenService } from "../services";

class AuthMiddleware {
  public isTokenExist(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      if (!token) {
        throw new ApiError("No token", 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public checkAccessToken(dto: EUserRole) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }

        const accessToken = tokenString.split("Bearer ")[1];

        const jwtPayload = tokenService.checkToken(
          accessToken,
          ETokenType.ACCESS,
        );

        const role = await roleRepository.getOneByParams({
          _id: jwtPayload.roleId,
        });
        if (dto !== role.role) {
          throw new ApiError("Not enough rights", 401);
        }

        const entity = await tokenRepository.getTokenByParams({ accessToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals.jwtPayload = jwtPayload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public checkRefreshToken(dto: EUserRole) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }

        const refreshToken = tokenString.split("Bearer ")[1];

        const jwtPayload = tokenService.checkToken(
          refreshToken,
          ETokenType.REFRESH,
        );

        const role = await roleRepository.getOneByParams({
          _id: jwtPayload.roleId,
        });
        if (dto !== role.role) {
          throw new ApiError("Not enough rights", 401);
        }

        const entity = await tokenRepository.getTokenByParams({ refreshToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals.jwtPayload = jwtPayload;
        req.res.locals.refreshToken = refreshToken;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
