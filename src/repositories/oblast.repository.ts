import { Oblast } from "../models";

class OblastRepository {
  public async getAll() {
    return await Oblast.find();
  }
}

export const oblastRepository = new OblastRepository();
