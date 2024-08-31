import { Router } from "express";
import profileController from "./profileController.js";
import  errorHandler  from "../../midleware/error.js";
import { isAuthUser } from "../../midleware/auth.js";

const profileROuter = Router();

profileROuter.get('/getProfile/:id',[isAuthUser],errorHandler(profileController.getProfile))
profileROuter.put('/update/:id',[isAuthUser],errorHandler(profileController.editProfile))

//
export default profileROuter;