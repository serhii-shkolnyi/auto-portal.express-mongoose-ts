import { NextFunction, Request, Response } from "express";

import { modelService } from "../services/model.service";

class ModelController {
  public async getAllForBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const brandId = req.body;
      const models = await modelService.getAllForBrand(brandId);

      return res.json(models).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async getId(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId = req.body;
      const model = await modelService.getId(modelId);

      return res.json(model).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const modelController = new ModelController();
