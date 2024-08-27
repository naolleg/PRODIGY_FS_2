import { Router } from "express";
import userRouter from "../api/user/userRoute.js";
import departmentROuter from "../api/department/departmentRoute.js";
import profileROuter from "../api/profile/profileRoute.js";
const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/department",departmentROuter)
appRouter.use("/profile",profileROuter)
export default appRouter;