import { Router } from "express";

import { adminController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/signUp",
  commonMiddleware.isBodyValid(UserValidator.create),
  adminController.signUp,
);

router.put(
  "/signUp/verify/:token",
  authMiddleware.isTokenExist,
  adminController.signUpVerify,
);
export const adminRouter = router;
