import * as jwt from "jsonwebtoken";

import { apiConfig } from "../configs";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, apiConfig.JWT_ACCESS_SECRET, {
      expiresIn: apiConfig.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, apiConfig.JWT_REFRESH_SECRET, {
      expiresIn: apiConfig.JWT_REFRESH_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
