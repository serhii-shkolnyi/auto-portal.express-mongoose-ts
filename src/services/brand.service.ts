import { Types } from "mongoose";

import { brandRepository } from "../repositories/brand.repository";

class BrandService {
  public async getAll() {
    return await brandRepository.getAll();
  }
  public async getId(brandId: Types.ObjectId) {
    return await brandRepository.getId(brandId);
  }
}

export const brandService = new BrandService();
