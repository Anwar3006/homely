import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errors/globalErrorHandler.js";
import AppError from "../errors/AppError.js";
import ManagerService from "../services/manager.service.js";

export const getManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cognitoId } = req.params;
    if (!cognitoId) {
      next(new AppError("Please provide a cognitoId", 400));
    }

    const manager = await ManagerService.get(cognitoId as string);
    if (!manager) {
      next(new AppError("Manager not found", 404));
    }
    res.status(200).json(manager);
  }
);

export const createManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const manager = await ManagerService.create(data);
    res.status(201).json(manager);
  }
);

export const updateManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cognitoId } = req.params;
    const data = req.body;

    if (!cognitoId) {
      next(new AppError("Please provide a cognitoId", 400));
    }
    if (!data.name && !data.email && !data.phoneNumber) {
      next(new AppError("No fields to update", 400));
    }

    const manager = await ManagerService.update(cognitoId as string, data);
    if (!manager) {
      next(new AppError("Manager update failed", 500));
    }
    res.status(200).json(manager);
  }
);
