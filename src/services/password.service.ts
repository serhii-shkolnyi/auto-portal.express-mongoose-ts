import bcrypt from "bcrypt";

import { apiConfig } from "../configs";
import { EUserRole } from "../enums";
import { ApiError } from "../errors";

class PasswordService {
  public hash(password: string, role: EUserRole): Promise<string> {
    let saltRounds: string;

    switch (role) {
      case EUserRole.ADMIN:
        saltRounds = apiConfig.BCRYPT_SALT_ROUNDS_ADMIN;
        break;
      case EUserRole.MANAGER:
        saltRounds = apiConfig.BCRYPT_SALT_ROUNDS_MANAGER;
        break;
      case EUserRole.SELLER:
        saltRounds = apiConfig.BCRYPT_SALT_ROUNDS_USER;
        break;
      default:
        throw new ApiError("create hash password error", 500);
    }

    return bcrypt.hash(password, Number(saltRounds));
  }

  public compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
