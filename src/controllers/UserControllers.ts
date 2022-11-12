import * as express from "express";
import { UserService } from "../services/UserService";
import { UtilServices } from "../services/UtilService";

export class UserControllers {
  /**
   * Create new user
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { email } = req.body;
      const userExists = await UserService.findOne({
        email: email.trim().toLowerCase(),
      });

      if (userExists) {
        return res.status(409).send({ message: "email already registered" });
      }

      const userPayload = {
        ...req.body,
        password: UtilServices.encryptPassword(req.body.password),
      };

      await UserService.create(userPayload);
      return res.status(201).send({ message: "user created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "user creation failed" });
    }
  }

  /**
   * Login existing users
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findOne({
        email: email.trim().toLowerCase(),
      });

      if (!user) {
        return res.status(201).send({ message: "user not found" });
      } else if (
        user &&
        !UtilServices.descryptPassword(password, user.password)
      ) {
        return res.status(400).json({ error: "wrong password" });
      }

      const token = UtilServices.createToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      return res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "user login failed" });
    }
  }

  /**
   * Verify auth token
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const auth = req.headers.authorization;

      if (!auth) {
        return res.status(400).json({ error: "token missing" });
      }

      const bearerToken = auth.split(" ")[1];

      const decodedToken = UtilServices.verifyToken(bearerToken);

      if (!decodedToken || !decodedToken.id) {
        return res.status(403).json({ error: "unauthorized" });
      }

      const user = await UserService.findOne({
        id: decodedToken.id,
      });

      if (!user) {
        return res.status(403).json({ error: "unauthorized" });
      }

      req["user"] = decodedToken;

      next();
    } catch (error) {
      console.error(error);
      return res.status(400).send({ error: "invalid token" });
    }
  }
}
