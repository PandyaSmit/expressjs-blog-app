import * as express from "express";

export class BlogsMiddleware {
  static list(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return res.send({ working: true });
  }
}
