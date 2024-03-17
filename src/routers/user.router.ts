import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { EUserRole } from "../enums";
import { authMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/me",
  authMiddleware.checkAccessToken([EUserRole.SELLER]),
  userController.me,
);

router.patch(
  "/updateMe",
  authMiddleware.checkAccessToken([EUserRole.SELLER]),
  userController.updateMe,
);

export const userRouter = router;
