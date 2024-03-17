import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters";
import { userService } from "../services/user.service";
import { ITokenPayload } from "../types";

class UserController {
  public async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      const user = await userService.me(userId);

      return res.json(UserPresenter.userResponse(user)).status(200);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      // const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      const body = req.body.user;
      const id = req.body.id;
      const userUpdate = await userService.updateMe(id, body);

      return res.json(UserPresenter.userResponse(userUpdate)).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
