import { Currency } from "../models";
import { ICurrency } from "../types";

class CurrencyRepository {
  public async getAll(): Promise<ICurrency[]> {
    return await Currency.create();
  }
  public async create(dto: ICurrency): Promise<ICurrency> {
    return await Currency.create(dto);
  }

  public async getLastRecord(): Promise<ICurrency> {
    return await Currency.findOne().sort({ createdAt: -1 });
  }
}

export const currencyRepository = new CurrencyRepository();
