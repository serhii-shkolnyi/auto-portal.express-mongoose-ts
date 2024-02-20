import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters";
import { authService } from "../services";
import { IChangePassword, ILogin, ITokenPayload, IUser } from "../types";

class AuthController {
  public async signUpAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdAdmin = await authService.signUpAdmin(body);

      return res
        .json({ data: UserPresenter.userResponse(createdAdmin) })
        .status(200);
    } catch (e) {
      next(e);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdUser = await authService.signUp(body);

      return res
        .json({ data: UserPresenter.userResponse(createdUser) })
        .status(200);
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

  public async signUpVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      await authService.signUpVerify(token);

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

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signIn(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async logoutAllAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as Partial<ITokenPayload>;

      await authService.logoutAllAdmin({ _userId: userId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async refreshAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const jwtTokens = await authService.refreshAdmin(
        jwtPayload,
        refreshToken,
      );

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async forgotPasswordAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.res.locals as IUser;

      await authService.forgotPasswordAdmin(user);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPasswordAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const actionToken = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotPasswordAdmin(newPassword, actionToken);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changePasswordAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const body = req.body as IChangePassword;

      await authService.changePasswordAdmin(body, jwtPayload);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
