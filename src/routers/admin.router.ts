import { Router } from "express";

import { adminController, authController } from "../controllers";
import { EUserRole } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/signUp",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.signUpAdmin,
);

router.put(
  "/signUp/verify/:token",
  authMiddleware.isTokenExist,
  authController.signUpVerifyAdmin,
);

router.post(
  "/signIn",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.signInAdmin,
);

router.post(
  "/logoutAll",
  authMiddleware.checkAccessToken([EUserRole.ADMIN]),
  authController.logoutAllAdmin,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken(EUserRole.ADMIN),
  authController.refreshAdmin,
);

router.post(
  "/forgotPassword",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userMiddleware.isUserExist("email"),
  authController.forgotPasswordAdmin,
);

router.put(
  "/forgotPassword/:token",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authController.setForgotPasswordAdmin,
);

router.post(
  "/changePassword",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken([EUserRole.ADMIN]),
  authController.changePasswordAdmin,
);

router.post(
  "/createShowroom",
  authMiddleware.checkAccessToken([EUserRole.ADMIN]),
  adminController.createShowroom,
);

router.post(
  "/createRole",
  authMiddleware.checkAccessToken([EUserRole.ADMIN]),
  adminController.createRole,
);

export const adminRouter = router;
