import { Router } from "express";
import { createTenant, getTenant } from "../controllers/tenant.controllers.js";

const tenantRouter = Router();

tenantRouter.get("/:cognitoId", getTenant);
tenantRouter.post("/", createTenant);

export default tenantRouter;
