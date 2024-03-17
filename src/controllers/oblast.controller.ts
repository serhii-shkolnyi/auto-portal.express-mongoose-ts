import { NextFunction, Request, Response } from "express";

import { oblastService } from "../services/oblast.service";

class OblastController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const oblasts = await oblastService.getAll();

      return res.json(oblasts).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const oblastController = new OblastController();
