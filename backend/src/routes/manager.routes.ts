import { Router } from "express";
import {
  createManager,
  getManager,
  updateManager,
} from "../controllers/manager.controllers.js";

const managerRouter = Router();

managerRouter.get("/:cognitoId", getManager);
managerRouter.put("/:cognitoId", updateManager);
managerRouter.post("/", createManager);

export default managerRouter;
