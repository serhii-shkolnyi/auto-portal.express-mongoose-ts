import { config } from "dotenv";

config();

export const apiConfig = {
  FRONT_URL: process.env.FRONT_URL,
  PORT: process.env.PORT || 5001,
  DB_URI: process.env.DB_URI,

  BCRYPT_SALT_ROUNDS_ADMIN: process.env.BCRYPT_SALT_ROUNDS_ADMIN,
  BCRYPT_SALT_ROUNDS_MANAGER: process.env.BCRYPT_SALT_ROUNDS_MANAGER,
  BCRYPT_SALT_ROUNDS_USER: process.env.BCRYPT_SALT_ROUNDS_USER,

  JWT_ACTION_ACTIVATE_ACCOUNT_SECRET:
    process.env.JWT_ACTION_ACTIVATE_ACCOUNT_SECRET,
  JWT_ACTION_EXPIRES_IN: process.env.JWT_ACTION_EXPIRES_IN,

  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
