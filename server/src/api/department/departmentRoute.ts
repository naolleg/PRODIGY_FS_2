import { Router } from "express";
import departmentController from "./departmentController.js";
import  errorHandler  from "../../midleware/error.js";

const departmentROuter = Router();


departmentROuter.post('/register', errorHandler(departmentController.register))
departmentROuter.get('/getAll',errorHandler(departmentController.getAll))
departmentROuter.put('/update/:id',errorHandler(departmentController.update))
departmentROuter.delete('/delete/:id',errorHandler(departmentController.delete))

export default departmentROuter;