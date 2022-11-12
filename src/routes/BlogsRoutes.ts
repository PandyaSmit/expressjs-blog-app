import * as express from "express";
import { BlogsControllers } from "../controllers/BlogsControllers";
import { ValidationService } from "../services/ValidationService";

const blogsRoutes: express.Router = express.Router();

blogsRoutes.post("/", [ValidationService.createBlog, BlogsControllers.create]);

blogsRoutes.get("/", [ValidationService.getBlogs, BlogsControllers.list]);

blogsRoutes.put("/:id", [
  ValidationService.updateBlog,
  BlogsControllers.update,
]);

blogsRoutes.delete("/:id", [
  ValidationService.removeBlog,
  BlogsControllers.remove,
]);

export { blogsRoutes };
