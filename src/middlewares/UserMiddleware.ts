import * as express from "express";

export class UserMiddleware {
  static register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return res.send({ working: true });
  }

  static login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return res.send({ working: true });
  }

  static auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return res.send({ working: true });
  }
}
