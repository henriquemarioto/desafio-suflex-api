import { Request, Response } from "express";
import SessionService from "../services/Session.service";

class SessionController {
  static login = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = await SessionService.login({ name, password });

    return res.status(201).json(user);
  };
}

export default SessionController;
