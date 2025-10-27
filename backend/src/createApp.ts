import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { globalErrorHandler, NotFound } from "./errors/globalErrorHandler.ts";

/* ROUTE IMPORTS */

const createApp = () => {
  /* CONFIGURATIONS */
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("common"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  /* REGISTER ROUTES */
  routes(app);

  /* Global Error Handler */
  app.use(NotFound);
  app.use(globalErrorHandler);

  return app;
};

export default createApp;
