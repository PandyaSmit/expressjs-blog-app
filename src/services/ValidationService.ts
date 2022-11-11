import _ from "lodash";
import * as express from "express";
import Joi, { ValidationResult } from "joi";

export const register = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const resgiterSchema = {
      email: Joi.string().required(),
      password: Joi.string().trim().min(8).required(),
      organizationName: Joi.string().required(),
      preferredLanguage: Joi.string(),
      phone: Joi.string().allow(""),
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

export const login = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const loginSchema = {
      password: Joi.string().required(),
      email: Joi.string().required(),
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
