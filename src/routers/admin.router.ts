import { Router } from "express";

import { adminController, authController } from "../controllers";
import { EUserRole } from "../enums";
import { authMiddleware, commonMiddleware } from "../middlewares";
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
  "/createShowroom",
  authMiddleware.checkAccessToken(EUserRole.ADMIN),
  adminController.createShowroom,
);

router.post(
  "/createRole",
  authMiddleware.checkAccessToken(EUserRole.ADMIN),
  adminController.createRole,
);

export const adminRouter = router;
