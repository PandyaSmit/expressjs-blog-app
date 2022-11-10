import * as express from "express";
import { BlogsMiddleware } from "../middlewares/BlogsMiddleware";

const blogsRoutes: express.Router = express.Router();

blogsRoutes.post("/", [BlogsMiddleware.list]);

blogsRoutes.post("/list", [BlogsMiddleware.list]);

blogsRoutes.put("/:id", [BlogsMiddleware.list]);

blogsRoutes.delete("/:id", [BlogsMiddleware.list]);

export { blogsRoutes };
