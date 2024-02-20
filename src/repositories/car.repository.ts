import { FilterQuery } from "mongoose";

import { Car } from "../models/car.model";
import { ICar } from "../types";

class CarRepository {
  public async create(dto: Partial<ICar>): Promise<ICar> {
    return await Car.create(dto);
  }
  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async getManyByParams(dto: Partial<ICar>): Promise<ICar[]> {
    return await Car.find({ _userId: dto._userId });
  }
}

export const carRepository = new CarRepository();
