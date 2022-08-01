import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const verifyCharacterAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  if (id) {
    const characterAlreadyExists = await prisma.favoriteCharacter.findUnique({
      where: { id },
    });

    if (characterAlreadyExists) {
      throw new AppError("Character with this id already exists", 409);
    }
  }

  next();
};

export default verifyCharacterAlreadyExistsMiddleware;
