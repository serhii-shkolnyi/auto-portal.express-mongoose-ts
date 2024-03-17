import { oblastRepository } from "../repositories/oblast.repository";

class OblastService {
  public async getAll() {
    return await oblastRepository.getAll();
  }
}

export const oblastService = new OblastService();
