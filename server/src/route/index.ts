import { Router } from "express";
import userRouter from "../api/user/userRoute.js";
import departmentROuter from "../api/department/departmentRoute.js";
const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/department",departmentROuter)
export default appRouter;