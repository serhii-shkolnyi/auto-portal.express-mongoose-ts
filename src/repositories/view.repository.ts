import { Types } from "mongoose";

import { View } from "../models";

class ViewRepository {
  public async create(id: Types.ObjectId): Promise<void> {
    await View.create({ _carId: id, view: 0 });
  }
}

export const viewRepository = new ViewRepository();
