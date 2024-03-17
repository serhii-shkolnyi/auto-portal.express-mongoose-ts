import { Types } from "mongoose";

import { Model } from "../models";
import { IModel } from "../types";

class ModelRepository {
  public async getAllForBrand(brandId: Types.ObjectId): Promise<IModel[]> {
    return await Model.find(brandId);
  }
  public async getId(modelId: Types.ObjectId): Promise<IModel> {
    return await Model.findById(modelId);
  }
}
export const modelRepository = new ModelRepository();
