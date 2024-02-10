import { FilterQuery, Types } from "mongoose";

import { User } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async create(body: Partial<IUser>): Promise<IUser> {
    return await User.create(body);
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async updateById(
    id: Types.ObjectId,
    body: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(id, body, { returnDocument: "after" });
  }
}

export const userRepository = new UserRepository();
