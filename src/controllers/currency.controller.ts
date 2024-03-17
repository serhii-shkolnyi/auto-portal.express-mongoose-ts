import { NextFunction, Request, Response } from "express";

import { currencyService } from "../services/currency.service";

class CurrencyController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const currency = await currencyService.getAll();

      return res.json(currency).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const currencyController = new CurrencyController();
