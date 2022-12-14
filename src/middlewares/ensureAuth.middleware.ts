import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";

export default function ensureAuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  try {
    const [, token] = authHeader.split(" ");
    const secret = process.env.JWT_SECRET || "default";
    const decoded = verify(token, secret) as any;

    const { sub, name } = decoded;

    request.user = {
      id: sub as string,
      name,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid Token");
  }
}
