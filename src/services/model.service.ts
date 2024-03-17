import { Types } from "mongoose";

import { modelRepository } from "../repositories/model.repository";

class ModelService {
  public async getAllForBrand(brandId: Types.ObjectId) {
    return await modelRepository.getAllForBrand(brandId);
  }
  public async getId(modelId: Types.ObjectId) {
    return await modelRepository.getId(modelId);
  }
}

export const modelService = new ModelService();
