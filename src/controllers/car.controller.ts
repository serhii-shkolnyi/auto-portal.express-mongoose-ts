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

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const car = await carService.getAll();

      return res.json(car).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async getId(req: Request, res: Response, next: NextFunction) {
    try {
      const _id = req.body;
      const car = await carService.getId(_id);

      return res.json(car).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async getAllForUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as Partial<ITokenPayload>;
      const car = await carService.getAllForUser(userId);

      return res.json(car).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
