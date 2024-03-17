import { NextFunction, Request, Response } from "express";

import { brandService } from "../services/brand.service";

class BrandController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await brandService.getAll();

      return res.json(brands).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async getId(req: Request, res: Response, next: NextFunction) {
    try {
      const brandId = req.body;
      const brand = await brandService.getId(brandId);

      return res.json(brand).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const brandController = new BrandController();
