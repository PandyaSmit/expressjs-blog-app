import * as express from "express";
import { UserMiddleware } from "../middlewares/UserMiddleware";

const userRoutes: express.Router = express.Router();
/**
 * Account Register
 */
userRoutes.post("/register", [UserMiddleware.register]);

/**
 * Account login
 */
userRoutes.post("/login", [UserMiddleware.login]);

/**
 * Account auth
 */
userRoutes.get("/auth", [UserMiddleware.auth]);

export { userRoutes };
