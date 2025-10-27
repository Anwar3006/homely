import type { NextFunction, Request, Response } from "express";
import AppError from "./AppError.ts";
import { NODE_ENV } from "../config/env.ts";

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

export const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    stack: err.stack,
    message: err.message,
  });
};

export const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  //logger.error(err.stack);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (NODE_ENV === "dev") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
