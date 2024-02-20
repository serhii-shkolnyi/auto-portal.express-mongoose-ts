import { NextFunction, Request, Response } from "express";

import { userRepository } from "../repositories";
import { carService } from "../services";
import { ICar, ITokenPayload } from "../types";

class CarController {
  public async createCar(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<ICar>;
      const { userId } = req.res.locals.jwtPayload as Partial<ITokenPayload>;
      const { accountType } = await userRepository.getOneByParams({
        _id: userId,
      });

      const car = await carService.createCar(body, userId, accountType);

      return res.json({ data: car }).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
