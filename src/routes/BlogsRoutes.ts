import * as express from "express";
import { BlogsControllers } from "../controllers/BlogsControllers";
import { UserControllers } from "../controllers/UserControllers";

const blogsRoutes: express.Router = express.Router();

blogsRoutes.post("/", [UserControllers.auth, BlogsControllers.list]);

blogsRoutes.post("/list", [UserControllers.auth, BlogsControllers.list]);

blogsRoutes.put("/:id", [UserControllers.auth, BlogsControllers.list]);

blogsRoutes.delete("/:id", [UserControllers.auth, BlogsControllers.list]);

export { blogsRoutes };
