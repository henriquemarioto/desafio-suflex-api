import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class SessionService {
  static login = async (data: any) => {
    const user = await prisma.user.findUnique({ where: { name: data.name } });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new AppError("Incorrect name/passaword", 403);
    }

    const token = jwt.sign(
      { name: user.name },
      process.env.JWT_SECRET || "default",
      { subject: user.id, expiresIn: "1d" }
    );

    return { token };
  };
}

export default SessionService;
