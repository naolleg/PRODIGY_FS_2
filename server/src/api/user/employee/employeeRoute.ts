import { Router } from "express";
import employeeController from "./employeeController.js";
import errorHandler from "../../../midleware/error.js";
import { isAdmin } from "../../../midleware/auth.js";
const employeeRouter = Router();

employeeRouter.get('/getAll',[isAdmin],errorHandler(employeeController.getAll));

export default employeeRouter;