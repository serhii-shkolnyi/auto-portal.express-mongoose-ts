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
    const allRolesOfShowroom = await roleRepository.getManyByParams(dto);
    allRolesOfShowroom.forEach((role) => {
      if (role.role === dto.role) {
        throw new ApiError("This role already exists for showroom", 400);
      }
    });
    return await roleRepository.create(dto);
  }
}

export const adminService = new AdminService();
