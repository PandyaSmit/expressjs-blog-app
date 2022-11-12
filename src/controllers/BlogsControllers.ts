import * as express from "express";
import moment from "moment";
import { user_roles_enum } from "../constants/users";
import { BlogsService } from "../services/BlogsService";
import { CategoryService } from "../services/CategoryService";
import { UtilServices } from "../services/UtilService";

export class BlogsControllers {
  /**
   * Create new blog
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const categoriesPayload: string[] = req.body.category;

      const categories = await CategoryService.findMany({
        _id: {
          $in: categoriesPayload.map((category) => {
            return UtilServices.convertToTypeObjectId(category);
          }),
        },
      });

      if (categories.length !== categoriesPayload.length) {
        return res.status(400).send({ error: "invalid categories" });
      }

      const dateNow = new Date();

      const blogPayload = {
        ...req.body,
        author: req["user"].id,
        categories: categories.map((category) => category._id),
        published_date: dateNow,
        modify_date: dateNow,
        updated_at: dateNow,
        created_at: dateNow,
      };

      await BlogsService.create(blogPayload);

      return res.status(201).send({ message: "blog created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog creation failed" });
    }
  }

  /**
   * List user blogs with filter and paging
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async list(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { limit, offset, published_date, author, category } = req.query;

      const filter = {};

      if (author) {
        filter["author"] = author;
      } else if (req["user"].role === user_roles_enum.user) {
        filter["author"] = req["user"].id;
      }

      if (published_date) {
        const startDate = moment(published_date.toString())
          .format("MM DD YYYY 00:00:00")
          .toString();

        const endDate = moment(published_date.toString())
          .utc()
          .format("MM DD YYYY 00:00:00")
          .toString();

        filter["published_date"] = {
          $gte: new Date(startDate).toISOString(),
          $lt: new Date(endDate).toISOString(),
        };
      }

      if (category) {
        filter["category"] = category;
      }

      const response = await BlogsService.findAll(filter, limit, offset);

      return res.status(200).send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog fetch failed" });
    }
  }

  /**
   * Update blog
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const findOptions = {
        _id: UtilServices.convertToTypeObjectId(req.params.id),
      };

      const blog = await BlogsService.findOne(findOptions);

      if (!blog) {
        return res.status(404).send({ error: "blog does not exist" });
      } else if (
        req["user"].role === user_roles_enum.user &&
        blog.author !== req["user"].id
      ) {
        return res.status(403).json({ error: "unauthorized" });
      }

      const blogPayload = {
        ...req.body,
        modify_date: new Date(),
        updated_at: new Date(),
      };

      if (req.body?.category && req.body.category.lenth) {
        const categoriesPayload: string[] = req.body.category;

        const categories = await CategoryService.findMany({
          _id: {
            $in: categoriesPayload.map((category) => {
              return UtilServices.convertToTypeObjectId(category);
            }),
          },
        });

        if (categories.length !== categoriesPayload.length) {
          return res.status(400).send({ error: "invalid categories" });
        }

        blogPayload.categories = {
          $push: categories.map((category) => category._id),
        };
      }

      await BlogsService.update(findOptions, blogPayload);

      return res.status(200).send({ message: "blog updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog updation failed" });
    }
  }

  /**
   * Remove blog
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static async remove(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const findOptions = {
        _id: UtilServices.convertToTypeObjectId(req.params.id),
      };

      const blog = await BlogsService.findOne(findOptions);

      if (!blog) {
        return res.status(404).send({ error: "blog does not exist" });
      } else if (
        req["user"].role === user_roles_enum.user &&
        blog.author !== req["user"].id
      ) {
        return res.status(403).json({ error: "unauthorized" });
      }

      await BlogsService.delete(findOptions);

      return res.status(200).send({ message: "blog removed" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog removal failed" });
    }
  }
}
