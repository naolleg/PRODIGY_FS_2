import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma.js";

const employeeController = {
    getAll:async(req: Request,res: Response,next: NextFunction)=>{

        try {
            const employees= await prisma.employee.findMany(
              {      include:{
                      department: {
                        select: {
                          name: true,
                        },
                      },
                    },
              });
            
            res.status(200).json({ success: true,
              message: "all employees",employees});
          } catch (error) {
            throw(error);
          }
        },

};
export default employeeController;