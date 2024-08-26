import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS } from "@prisma/client";
import { SECRET } from "../../config/secrete.js";
import { generatePassword } from "../../utils/generator.js"
import { sendEmail } from "../../utils/emailSender.js";

const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
  //check if the email exists
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (isUserExist) {
    return res.status(404).json({
      success: false,
      message: "Email is already in use",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = await prisma.user.create({
    data: {

      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender:req.body.gender,
      passwordHash: hashedPassword,
      activeStatus: STATUS.ACTIVE,
      phoneNumber: req.body.phoneNumber,
      departmentId:req.body.departmentId
      
    },
  });

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
},
  

  login: async (req: Request, res: Response, next: NextFunction) => {
    console.log("sdfvsf");
    
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
   
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
      return res.status(404).json({
        success: false,
        message: "password is incorrect",
      });
    }
    if (user.activeStatus != STATUS.ACTIVE) {
      return res.status(404).json({
        success: false,
        message: "user is not active",
      });
    }
    console.log(user);
    
    const payload = {
      id: user.id,
      firstName: user.firstName,
    };
    console.log("kdajkn");
    
    const token = await jwt.sign(payload, SECRET!);

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
      token: token,
    });
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    console.log("sdfvsf");
   if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(404).json({
      success: false,
      message: "password is incorrect",
    });
  }
    if (req.body.newpassword != req.body.conformpassword) {
      return res.status(404).json({
        success: false,
        message: "new passwords does not match",
      });
    }
    
    const salt = bcrypt.genSaltSync(10);
    const newpassword = bcrypt.hashSync(req.body.newpassword, salt);
    const updateUser = await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        passwordHash: newpassword,
      },
    });


    return res.status(200).json({
      success: true,
      message: "password updated successfully",
      data: updateUser,
    });
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    const newPassword = generatePassword();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
  
    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });
  
    sendEmail(user.email, newPassword);
  
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: updateUser,
    });
  },
  updateUserInfo:async (req: Request, res: Response, next: NextFunction) => {
    console.log("jdh");
    
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const updateUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender:req.body.gender,
      },
    });

    return res.status(200).json({
      success: true,
      message: "user info updated successfully",
      data: updateUser,
    });
  },
  changeStatus: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const updateUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        activeStatus: req.body.activeStatus,
      },
    });

    return res.status(200).json({
      success: true,
      message: "status updated successfully",
      data: updateUser,
    });
  },
  getAll:async(req: Request,res: Response,next: NextFunction)=>{

    try {
        const users= await prisma.user.findMany()
        res.status(200).json({ success: true,
          message: "all Users",users});
      } catch (error) {
        throw(error);
      }
    },
};
export default userController;
