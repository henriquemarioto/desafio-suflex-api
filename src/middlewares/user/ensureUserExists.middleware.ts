import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const ensureUserIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  next();
};

export default ensureUserIdExistsMiddleware;
