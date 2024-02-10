import { NextFunction, Request, Response } from "express";

import { adminService } from "../services";
import { IUser } from "../types";

class AdminController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdAdmin = await adminService.signUp(body);

      return res.json({ data: createdAdmin }).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async signUpVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      await adminService.signUpVerify(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
