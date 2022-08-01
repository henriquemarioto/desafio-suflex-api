import { Request, Response } from "express";
import FavoriteCharacterService from "../services/FavoriteCharacter.service";

class FavoriteCharacterController {
  static create = async (req: Request, res: Response) => {
    const characterData = req.body;
    const character = await FavoriteCharacterService.create(characterData);

    return res.status(201).json(character);
  };

  static list = async (req: Request, res: Response) => {
    const user = await FavoriteCharacterService.list();

    return res.json(user);
  };

  static retrieve = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await FavoriteCharacterService.retrieve(Number(id));

    return res.json(user);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      id: idToChange,
      name,
      status,
      species,
      type,
      gender,
      origin,
      location,
      image,
      episode,
      url,
      created,
    } = req.body;

    const user = await FavoriteCharacterService.update(Number(id), {
      id: idToChange,
      name,
      status,
      species,
      type,
      gender,
      origin,
      location,
      image,
      episode,
      url,
      created,
    });

    return res.json(user);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await FavoriteCharacterService.delete(Number(id));

    return res.status(204).json();
  };
}

export default FavoriteCharacterController;
