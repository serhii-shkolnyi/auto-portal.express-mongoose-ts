import { FilterQuery } from "mongoose";

import { Role } from "../models";
import { IRole } from "../types";

class RoleRepository {
  public async create(dto: Partial<IRole>): Promise<IRole> {
    return await Role.create(dto);
  }
  public async getOneByParams(params: FilterQuery<IRole>): Promise<IRole> {
    return await Role.findOne(params);
  }

  public async getManyByParams(dto: Partial<IRole>): Promise<IRole[]> {
    return await Role.find({ _showroomId: dto._showroomId });
  }
}

export const roleRepository = new RoleRepository();
