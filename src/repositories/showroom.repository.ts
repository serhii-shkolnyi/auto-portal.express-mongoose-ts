import { FilterQuery } from "mongoose";

import { Showroom } from "../models";
import { IShowroom } from "../types";

class ShowroomRepository {
  public async create(dto: Partial<IShowroom>): Promise<IShowroom> {
    return await Showroom.create(dto);
  }
  public async getOneByParams(
    params: FilterQuery<IShowroom>,
  ): Promise<IShowroom> {
    return await Showroom.findOne(params);
  }
}

export const showroomRepository = new ShowroomRepository();
