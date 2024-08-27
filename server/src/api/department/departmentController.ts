import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma.js";

const departmentController={
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const newDepartment = await prisma.department.create({
            data: {
              name: req.body.name,
              type: req.body.type,
              managerId: req.body.managerId,
              // Add other fields as needed
            },
          });
          return res.status(201).json({
            success: true,
            message: 'Department registered successfully',
            data: newDepartment,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: 'Error registering department',
          });
        }
      },
    update: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
               
        const departmentExist = await prisma.department.findFirst({where:{
            id: +id,
        }})
        if(!departmentExist){
            return res.status(404).json({
                success: false,
                message: "department not found"
            })
        }

        const updatedepartment = await prisma.department.update({
            where:{
                id: +id,
            },     
         
                data:{
                    name: req.body.name,
                    type: req.body.type,
                    managerId: req.body.managerId,
                }
        });

        return res.status(200).json({
            success: true,
            message: 'updated department',
            data: updatedepartment
        })
    },
    getAll:async(req: Request,res: Response,next: NextFunction)=>{

        try {
            const department= await prisma.department.findMany({
                include:{
                    manager:{
                        select:{
                            user:{
                                select:{
                                    firstName:true,
                                    lastName:true
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json({ success: true,
              message: "all department",department});
          } catch (error) {
            throw(error);
          }
        },

    delete: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
        const departmentExist = await prisma.department.findFirst({where:{
            id: +id,
        }})
        if(!departmentExist){
            return res.status(404).json({
                success: false,
                message: "department not found"
            })
        }
        const deleteddepartment = await prisma.department.delete({
            where: {
                id: +id
            }
        });

        return res.status(200).json({
            success: true,
            message: 'department deleted sucessfully',
            data:deleteddepartment
        })
    },

}
export default departmentController;