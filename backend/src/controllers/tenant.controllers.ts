import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errors/globalErrorHandler.js";
import TenantService from "../services/tenant.service.js";
import AppError from "../errors/AppError.js";

export const getTenant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cognitoId } = req.params;
    if (!cognitoId) {
      next(new AppError("Please provide a cognitoId", 400));
    }

    const tenant = await TenantService.get(cognitoId as string);
    if (!tenant) {
      next(new AppError("Tenant not found", 404));
    }
    res.status(200).json(tenant);
  }
);

export const createTenant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const tenant = await TenantService.create(data);
    res.status(201).json(tenant);
  }
);
