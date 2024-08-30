import { Router } from "express";
import employeeController from "./employeeController.js";
import errorHandler from "../../../midleware/error.js";
const employeeRouter = Router();

employeeRouter.get('/getAll',errorHandler(employeeController.getAll));

export default employeeRouter;