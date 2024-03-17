import { currencyRepository } from "../repositories";

class CurrencyService {
  public async getAll() {
    return await currencyRepository.getAll();
  }
}

export const currencyService = new CurrencyService();
