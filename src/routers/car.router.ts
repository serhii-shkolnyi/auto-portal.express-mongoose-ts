import { Router } from "express";

import { carController } from "../controllers";
import { EUserRole } from "../enums";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  authMiddleware.checkAccessToken([EUserRole.SELLER, EUserRole.ADMIN]),
  carController.createCar,
);

router.get("/", carController.getAll);
router.get(
  "/userId",
  authMiddleware.checkAccessToken([EUserRole.SELLER, EUserRole.ADMIN]),
  carController.getAllForUser,
);
router.post("/carId", carController.getId);
export const carRouter = router;
