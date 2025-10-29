import { Router } from "express";
import {
  createTenant,
  getTenant,
  updateTenant,
} from "../controllers/tenant.controllers.js";

const tenantRouter = Router();

tenantRouter.get("/:cognitoId", getTenant);
tenantRouter.put("/:cognitoId", updateTenant);
tenantRouter.post("/", createTenant);

export default tenantRouter;
