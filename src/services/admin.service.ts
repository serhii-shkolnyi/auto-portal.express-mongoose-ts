import { ApiError } from "../errors";
import { roleRepository, showroomRepository } from "../repositories";
import { IRole, IShowroom } from "../types";

class AdminService {
  public async createShowroom(dto: Partial<IShowroom>): Promise<IShowroom> {
    const showroom = await showroomRepository.getOneByParams({
      showroom: dto.showroom,
    });
    if (showroom) {
      throw new ApiError("This showroom already exists", 400);
    }
    return await showroomRepository.create(dto);
  }
  public async createRole(dto: Partial<IRole>): Promise<IRole> {
    return await roleRepository.create(dto);
  }
}

export const adminService = new AdminService();
