import * as express from "express";
import moment from "moment";
import { user_roles_enum } from "../constants/users";
import { BlogsService } from "../services/BlogsService";
import { CategoryService } from "../services/CategoryService";
import { UtilServices } from "../services/UtilService";

export class BlogsControllers {
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

      const blogPayload = {
        ...req.body,
        author: req["user"].id,
        categories: categories.map((category) => category._id),
      };

      await BlogsService.create(blogPayload);

      return res.status(201).send({ message: "blog created" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog creation failed" });
    }
  }

  static async list(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { limit, offset, published_date, author, category } = req.query;

      let filter = {};

      if (author && req["user"].role === user_roles_enum.admin) {
        filter = {
          ...filter,
          author,
        };
      } else {
        filter = {
          ...filter,
          author: req["user"].id,
        };
      }

      if (published_date) {
        const startDate = moment(published_date.toString())
          .format("MM DD YYYY 00:00:00")
          .toString();

        const endDate = moment(published_date.toString())
          .utc()
          .format("MM DD YYYY 00:00:00")
          .toString();

        filter = {
          ...filter,
          published_date: {
            $gte: new Date(startDate).toISOString(),
            $lt: new Date(endDate).toISOString(),
          },
        };
      }

      if (category) {
        filter = {
          ...filter,
          category,
        };
      }

      const response = await BlogsService.findAll(filter, limit, offset);

      return res.status(201).send(response);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog fetch failed" });
    }
  }

  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const findOptions =
        req["user"].role === user_roles_enum.admin
          ? {
              _id: UtilServices.convertToTypeObjectId(req.params.id),
            }
          : {
              _id: UtilServices.convertToTypeObjectId(req.params.id),
              author: req["user"].id,
            };

      const blog = await BlogsService.findOne(findOptions);

      if (!blog) {
        return res.status(400).send({ error: "blog does not exist" });
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

      await BlogsService.update(
        {
          _id: UtilServices.convertToTypeObjectId(req.params.id),
        },
        blogPayload
      );

      return res.status(201).send({ message: "blog updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog updation failed" });
    }
  }

  static async remove(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const findOptions =
        req["user"].role === user_roles_enum.admin
          ? {
              _id: UtilServices.convertToTypeObjectId(req.params.id),
            }
          : {
              _id: UtilServices.convertToTypeObjectId(req.params.id),
              author: req["user"].id,
            };

      await BlogsService.delete(findOptions);

      return res.status(201).send({ message: "blog removed" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "blog removal failed" });
    }
  }
}
