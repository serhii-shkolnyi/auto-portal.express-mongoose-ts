import { Router } from "express";

import { adminRouter } from "./admin.router";
import { authRouter } from "./auth.router";
import { carRouter } from "./car.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/car", carRouter);

export const apiRouter = router;
