import * as express from "express";
import { userRoutes } from "./UserRoutes";
import { blogsRoutes } from "./BlogsRoutes";

const router: express.Router = express.Router();

router.use("/users", userRoutes);
router.use("/blogs", userRoutes);

export { router };
