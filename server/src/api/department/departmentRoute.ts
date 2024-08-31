import { Router } from "express";
import departmentController from "./departmentController.js";
import  errorHandler  from "../../midleware/error.js";
import { isAdmin } from "../../midleware/auth.js";

const departmentROuter = Router();


departmentROuter.post('/register',[isAdmin], errorHandler(departmentController.register))
departmentROuter.get('/getAll',[isAdmin],errorHandler(departmentController.getAll))
departmentROuter.get('/get/:id',[isAdmin],errorHandler(departmentController.getsingle))
departmentROuter.put('/update/:id',[isAdmin],errorHandler(departmentController.update))
departmentROuter.delete('/delete/:id',[isAdmin],errorHandler(departmentController.delete))

export default departmentROuter;