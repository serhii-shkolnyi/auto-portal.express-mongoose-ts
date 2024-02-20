import { Currency } from "../models";
import { ICurrency } from "../types";

class CurrencyRepository {
  public async create(dto: ICurrency): Promise<ICurrency> {
    return await Currency.create(dto);
  }
}

export const currencyRepository = new CurrencyRepository();
