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

router.get("/cars", carController.getAll);
export const carRouter = router;
