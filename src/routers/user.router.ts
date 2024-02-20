import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();
router.post(
  "/signUp",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.signUp,
);

router.put(
  "/signUp/verify/:token",
  authMiddleware.isTokenExist,
  authController.signUpVerify,
);

router.post(
  "/signIn",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.signIn,
);

export const userRouter = router;
