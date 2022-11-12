import _ from "lodash";
import * as express from "express";
import Joi, { ValidationResult } from "joi";
import { blogs_status_enum } from "../constants/blogs";

export class ValidationService {
  static register = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const now = Date.now();
      const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 21); // go back by 21 years

      const resgiterSchema = {
        email: Joi.string().email().required(),
        password: Joi.string().trim().min(8).required(),
        name: Joi.string().required(),
        dob: Joi.date().max(cutoffDate).required(),
      };

      const schema = Joi.object().keys(resgiterSchema);

      const validationResult: ValidationResult = schema.validate(req.body);

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  static login = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const loginSchema = {
        email: Joi.string().required(),
        password: Joi.string().required(),
      };

      const schema = Joi.object().keys(loginSchema);

      const validationResult: ValidationResult = schema.validate(req.body);

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  static createBlog = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const blogCreateSchema = {
        title: Joi.string().required(),
        description: Joi.string(),
        status: Joi.string()
          .valid(blogs_status_enum.unpublished, blogs_status_enum.published)
          .required(),
        category: Joi.array().items(Joi.string().hex().length(24)),
      };

      const schema = Joi.object().keys(blogCreateSchema);

      const validationResult: ValidationResult = schema.validate(req.body);

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  static getBlogs = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const blogsFetchSchema = {
        limit: Joi.number().required(),
        offset: Joi.number().required(),
        published_date: Joi.date(),
        author: Joi.string().hex().length(24),
        category: Joi.string().hex().length(24),
      };

      const schema = Joi.object().keys(blogsFetchSchema);

      const validationResult: ValidationResult = schema.validate(req.query);

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  static updateBlog = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const blogUpdateSchema = {
        id: Joi.string().hex().length(24).required(),
        title: Joi.string(),
        description: Joi.string(),
        status: Joi.string().valid(
          blogs_status_enum.unpublished,
          blogs_status_enum.published
        ),
        category: Joi.array().items(Joi.string().hex().length(24)),
      };

      const schema = Joi.object().keys(blogUpdateSchema);

      const validationResult: ValidationResult = schema.validate({
        ...req.params,
        ...req.body,
      });

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  static removeBlog = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const blogRemoveSchema = {
        id: Joi.string().hex().length(24).required(),
      };

      const schema = Joi.object().keys(blogRemoveSchema);

      const validationResult: ValidationResult = schema.validate({
        ...req.params,
        ...req.body,
      });

      if (validationResult.error) {
        return res.status(400).send({ error: validationResult.error });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };
}
