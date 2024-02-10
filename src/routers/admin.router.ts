import { Router } from "express";

import { authController } from "../controllers";
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
export const adminRouter = router;
