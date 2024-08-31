import { Router } from "express";
import userController from "./userController.js";
import errorHandler from "../../midleware/error.js";
import { isAdmin } from "../../midleware/auth.js";
const userRouter = Router();

userRouter.post('/register',[isAdmin],errorHandler(userController.register));
userRouter.get('/getAll',[isAdmin],errorHandler(userController.getAll));
userRouter.post('/login',errorHandler(userController.login));
userRouter.put('/change-password/:id',errorHandler(userController.changePassword));
userRouter.put('/reset-password',errorHandler(userController.resetPassword));
userRouter.put('/change-status/:id',errorHandler(userController.changeStatus));
userRouter.post('/otpverify',(userController.otpVerification));
userRouter.put('/newpassword',errorHandler(userController.newPassword));
//userRouter.put('/updateInfo/:id',errorHandler(userController.updateUserInfo));
export default userRouter;
    