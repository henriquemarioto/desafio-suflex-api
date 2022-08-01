import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const verifyNameAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (name) {
    const nameAlreadyExists = await prisma.user.findUnique({
      where: { name },
    });

    if (nameAlreadyExists) {
      throw new AppError("User with this name already exists", 409);
    }
  }

  next();
};

export default verifyNameAlreadyExistsMiddleware;
