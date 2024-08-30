import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS } from "@prisma/client";
import { SECRET } from "../../config/secrete.js";
import { generatePassword } from "../../utils/generator.js"
import { sendEmail } from "../../utils/emailSender.js";
import { emit } from "process";

const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
  //check if the email exists
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (isUserExist) {
    return res.status(409).json({
      success: false,
      message: "Email is already in use",
    });
  }
  
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.passwordHash, salt);
  
    const newEmployee = await prisma.user.create({
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passwordHash: hashedPassword,
        activeStatus: STATUS.ACTIVE,
        employees: {
          create: {
            deptId: req.body.departmentId,
            jobTitle: req.body.jobTitle,
            imageUrl: req.body.imageUrl,
            gender: req.body.gender,
            address: {
              create: {
                subcity: req.body.subcity,
                city: req.body.city,
                houseNumber: req.body.houseNumber,
              },
            },
          },
        },
      },
    });
  
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
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
  },  getAll:async(req: Request,res: Response,next: NextFunction)=>{

    try {
        const users= await prisma.user.findMany(
          {
            include: {
              employees: {
                select: {
                  gender:true,
                  department: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          });
        
        res.status(200).json({ success: true,
          message: "all Users",users});
      } catch (error) {
        throw(error);
      }
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
  
    const newOtp = generatePassword();
    
  const updateUser = await prisma.user.update({
    where: {
          email: email,
        },
        data:{
        otp:newOtp
  }});

  sendEmail(user.email, newOtp);
  
    return res.status(200).json({
      success: true,
      message: "Otp send successfully",

    });
  }, 
  otpVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body;
  
      const users= await prisma.user.findUnique({
        where: { email },
      });
  
      if (
        !users ||
        users.otp !== otp 
       
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP. Please request a new OTP.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "OTP verified successfully.",
      });
    } catch (error:any) {
      console.error("Error in otpVerification:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while verifying the OTP.",
        error: error.message,
      });
    }
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
   newPassword: async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const newPassword = req.body.newpassword;
  
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const userExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });
  
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          passwordHash: hashedPassword,
        },
      });
  
      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error('Error in newPassword:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing newPassword.',
  
      });
    }
  }





  // verifyOtp{

  // }
  // updateUserInfo:async (req: Request, res: Response, next: NextFunction) => {
  //   console.log("jdh");
    
  //   const id = req.params.id;
  //   const user = await prisma.user.findFirst({
  //     where: {
  //     email
  //     },
  //   });
  //   if (!user) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "user not found",
  //     });
  //   }
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: +id,
    //   },
    //   data: {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     employees: {
    //       update: {
    //         jobTitle: req.body.jobTitle,
    //         imageUrl: req.body.imageUrl,
    //         gender: req.body.gender,
    //         address: {
    //           upsert: {
    //             create: {
    //               subcity: req.body.subcity,
    //               city: req.body.city,
    //               houseNumber: req.body.houseNumber
    //             },
    //             update: {
    //               subcity: req.body.subcity,
    //               city: req.body.city,
    //               houseNumber: req.body.houseNumber
    //             }
    //           }
    //         }
    //       }
    //     }
    //   },
    // });
    
    // return res.status(200).json({
    //   success: true,
    //   message: "user info updated successfully",
    //   data: updateUser,
    // });
  

};
export default userController;
