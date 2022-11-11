import * as express from "express";
import { UserService } from "../services/UserService";

export class UserMiddleware {
  static async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      await UserService.create(req.body);
      return res.status(201).send({ message: "user created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "user creation failed" });
    }
  }

  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await UserService.findOne({ email });

      if (!user) {
        return res.status(201).send({ message: "user not found" });
      } else if (user && user.password !== password) {
        return res.status(201).send({ message: "wrong password" });
      }

      return res.status(200).send({ message: "user logged in" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "user creation failed" });
    }
  }

  static auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return res.send({ working: true });
  }
}
