import * as express from "express";
import { UserControllers } from "../controllers/UserControllers";
import { ValidationService } from "../services/ValidationService";

const userRoutes: express.Router = express.Router();
/**
 * Account Register
 */
userRoutes.post("/register", [
  ValidationService.register,
  UserControllers.register,
]);

/**
 * Account login
 */
userRoutes.post("/login", [ValidationService.login, UserControllers.login]);

/**
 * Account auth
 */
userRoutes.get("/auth", [UserControllers.auth]);

export { userRoutes };
