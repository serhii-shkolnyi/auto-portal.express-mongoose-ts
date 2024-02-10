import { NextFunction, Request, Response } from "express";

import { adminService } from "../services";
import { IRole, IShowroom } from "../types";

class AdminController {
  public async createShowroom(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IShowroom>;
      const newShowroom = await adminService.createShowroom(body);

      return res.json({ data: newShowroom }).status(200);
    } catch (e) {
      next(e);
    }
  }
  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IRole>;
      const newRole = await adminService.createRole(body);

      return res.json({ data: newRole }).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
