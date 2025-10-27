import type { Express, Request, Response } from "express";

import { VERSION } from "../config/env.js";

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
  //   app.use(`/api/${VERSION}`/users, userRouter);
};

export default routes;
