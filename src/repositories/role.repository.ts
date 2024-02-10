import { FilterQuery } from "mongoose";

import { Role } from "../models";
import { IRole } from "../types";

class RoleRepository {
  public async getOneByParams(params: FilterQuery<IRole>): Promise<IRole> {
    return await Role.findOne(params);
  }
}

export const roleRepository = new RoleRepository();
