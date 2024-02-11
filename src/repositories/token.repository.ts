import { FilterQuery } from "mongoose";

import { Token } from "../models";
import { IToken } from "../types";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async getTokenByParams(
    params: FilterQuery<Partial<IToken>>,
  ): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteOneByParams(
    params: FilterQuery<Partial<IToken>>,
  ): Promise<void> {
    await Token.deleteOne(params);
  }

  public async deleteManyByParams(
    params: FilterQuery<Partial<IToken>>,
  ): Promise<void> {
    await Token.deleteMany(params);
  }
}

export const tokenRepository = new TokenRepository();
