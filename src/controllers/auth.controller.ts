import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ILogin, IUser } from "../types";

class AuthController {
  public async signUpAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdAdmin = await authService.signUpAdmin(body);

      return res.json({ data: createdAdmin }).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async signUpVerifyAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;

      await authService.signUpVerifyAdmin(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async signInAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signInAdmin(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
