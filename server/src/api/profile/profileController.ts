import { prisma } from "../../config/prisma.js";
import { NextFunction, Request, Response } from "express";


const profileController={
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          employees: {
            select: {
              gender: true,
              imageUrl: true,
              jobTitle: true,
            },
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
 editProfile: async (req: Request, res: Response,next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { firstName, lastName, email } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          email,
        },
      });

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default profileController;