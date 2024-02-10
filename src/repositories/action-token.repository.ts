import { FilterQuery } from "mongoose";

import { ActionToken } from "../models";
import { IActionToken } from "../types";

class ActionTokenRepository {
  public async createActionToken(data: Partial<IActionToken>) {
    return await ActionToken.create(data);
  }

  public async getActionTokenByParams(
    params: FilterQuery<Partial<IActionToken>>,
  ) {
    return await ActionToken.findOne(params);
  }

  public async deleteActionTokenByParams(
    params: FilterQuery<Partial<IActionToken>>,
  ) {
    return await ActionToken.deleteOne(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
