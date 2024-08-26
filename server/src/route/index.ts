import { Router } from "express";
import userRouter from "../api/user/userRoute.js";
const appRouter = Router();
appRouter.use("/user", userRouter);
export default appRouter;