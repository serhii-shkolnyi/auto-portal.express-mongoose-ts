import { FilterQuery, Types } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async create(dto: Partial<ICar>): Promise<ICar> {
    return await Car.create(dto);
  }

  public async getAll(): Promise<ICar[]> {
    return await Car.find();
  }
  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async getManyByParams(dto: Partial<ICar>): Promise<ICar[]> {
    return await Car.find({ _userId: dto._userId });
  }

  public async updateForId(
    id: Types.ObjectId,
    body: Partial<ICar>,
  ): Promise<void> {
    await Car.findByIdAndUpdate(id, body);
  }
}

export const carRepository = new CarRepository();
