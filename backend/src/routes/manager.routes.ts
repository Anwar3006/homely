import { Router } from "express";
import {
  createManager,
  getManager,
} from "../controllers/manager.controllers.js";

const managerRouter = Router();

managerRouter.get("/:cognitoId", getManager);
managerRouter.post("/", createManager);

export default managerRouter;
