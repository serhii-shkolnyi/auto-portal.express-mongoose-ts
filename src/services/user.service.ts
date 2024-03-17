import { Types } from "mongoose";

import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async me(userId: Types.ObjectId) {
    return await userRepository.getOneByParams({ _id: userId });
  }

  public async updateMe(id: Types.ObjectId, body: Partial<IUser>) {
    return await userRepository.updateById(id, body);
  }
}

export const userService = new UserService();
