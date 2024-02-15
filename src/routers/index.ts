import { Router } from "express";

import { adminRouter } from "./admin.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);

export const apiRouter = router;
