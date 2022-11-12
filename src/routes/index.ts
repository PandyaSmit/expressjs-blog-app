import * as express from "express";
import { userRoutes } from "./UserRoutes";
import { blogsRoutes } from "./BlogsRoutes";
import { UserControllers } from "../controllers/UserControllers";

const router: express.Router = express.Router();

router.use("/users", userRoutes);
router.use("/blogs", UserControllers.auth, blogsRoutes);

export { router };
