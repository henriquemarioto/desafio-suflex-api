import { Request, Response } from "express";
import UserService from "../services/User.service";

class UserController {
  static create = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = await UserService.create({ name, password });

    return res.status(201).json(user);
  };

  static list = async (req: Request, res: Response) => {
    const user = await UserService.list();

    return res.json(user);
  };

  static retrieve = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserService.retrieve(id);

    return res.json(user);
  };

  static retrieveSelf = async (req: Request, res: Response) => {
    const { id } = req.user;

    const user = await UserService.retrieve(id);

    return res.json(user);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { name, password, favoriteCharacters } = req.body;
    const updatedAt = new Date();

    const user = await UserService.update(id, { name, password, updatedAt, favoriteCharacters });

    return res.json(user);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.user;

    await UserService.delete(id);

    return res.status(204).json();
  };

  static addFavoriteCharacter = async (req: Request, res: Response) => {
    const { id } = req.user;

    await UserService.delete(id);

    return res.status(204).json();
  };
}

export default UserController;
