import _ from "lodash";
import * as express from "express";
import Joi, { ValidationResult } from "joi";

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
}
