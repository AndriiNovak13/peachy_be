import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiError } from "../errors";

export const validate = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const transformedErrors = error.details.map((error) => ({
        field: error.context?.key,
        message: error.message
      }));

      throw ApiError.BadRequest(transformedErrors);
    }

    req.body = value;
    next();
  };
};
