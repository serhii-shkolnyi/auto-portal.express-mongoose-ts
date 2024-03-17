import { Router } from "express";

import { adminRouter } from "./admin.router";
import { authRouter } from "./auth.router";
import { brandRouter } from "./brand.router";
import { carRouter } from "./car.router";
import { currencyRouter } from "./currency.router";
import { modelRouter } from "./model.router";
import { oblastRouter } from "./oblast.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/brands", brandRouter);
router.use("/models", modelRouter);
router.use("/oblasts", oblastRouter);
router.use("/currency", currencyRouter);

export const apiRouter = router;
