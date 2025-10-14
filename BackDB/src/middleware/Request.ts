import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi, { Schema } from "joi";

export const validateRequest = (schema: Schema, target: "body" | "query" | "params" = "body"): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("📥 Dữ liệu gửi lên:", req[target]);
    const { error, value } = schema.validate(req[target], { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ error: "Dữ liệu không hợp lệ", details: error.details.map(e => e.message) });
    }
    req[target] = value;
    next();
  };
};
