import { Types } from "mongoose";

import { Brand } from "../models";

class BrandRepository {
  public async getAll() {
    return await Brand.find();
  }
  public async getId(brandId: Types.ObjectId) {
    return await Brand.findById(brandId);
  }
}

export const brandRepository = new BrandRepository();
