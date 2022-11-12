import * as express from "express";
import { BlogsControllers } from "../controllers/BlogsControllers";

const blogsRoutes: express.Router = express.Router();

blogsRoutes.post("/", [BlogsControllers.list]);

blogsRoutes.post("/list", [BlogsControllers.list]);

blogsRoutes.put("/:id", [BlogsControllers.list]);

blogsRoutes.delete("/:id", [BlogsControllers.list]);

export { blogsRoutes };
