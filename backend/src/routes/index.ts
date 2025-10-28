import type { Express, Request, Response } from "express";

import { VERSION } from "../config/env.js";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import tenantRouter from "./tenant.routes.ts";
import managerRouter from "./manager.routes.ts";

const routes = (app: Express) => {
  /* Home/Healthcheck Route */
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      version: VERSION,
      status: "OK",
      date: new Date().toISOString(),
    });
  });

  /* Other Routes */
  // app.use(`/api/${VERSION}`/users, userRouter);
  app.use(`/api/${VERSION}/tenants`, authMiddleware(["tenant"]), tenantRouter);
  app.use(
    `/api/${VERSION}/managers`,
    authMiddleware(["manager"]),
    managerRouter
  );
};

export default routes;
