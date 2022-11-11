import * as express from "express";
import { UserMiddleware } from "../middlewares/UserMiddleware";
import { register, login } from "../services/ValidationService";

const userRoutes: express.Router = express.Router();
/**
 * Account Register
 */
userRoutes.post("/register", [register, UserMiddleware.register]);

/**
 * Account login
 */
userRoutes.post("/login", [login, UserMiddleware.login]);

/**
 * Account auth
 */
userRoutes.get("/auth", [UserMiddleware.auth]);

export { userRoutes };
