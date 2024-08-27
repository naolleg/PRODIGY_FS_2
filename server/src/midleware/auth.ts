import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/secrete.js";
import { prisma } from "../config/prisma.js";
import { Role, User } from "@prisma/client";

interface Middleware {
  (req: Request, res: Response, next: NextFunction): void;
}

const isAuthUser: Middleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const payload = await jwt.verify(token, SECRET!) as jwt.JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin: Middleware = async (req, res, next) => {
  const user = req.user as User | undefined;

  if (!user || user.role !== Role.ADMIN) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};

export { isAuthUser, isAdmin };