import { IUpdateUser } from "./../interfaces/user.interface";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ICreateUser } from "../interfaces/user.interface";
import formatUser from "../utils/user/formatUser";
import FavoriteCharacterService from "../services/FavoriteCharacter.service";

const prisma = new PrismaClient();

class UserService {
  static create = async (data: ICreateUser) => {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
      },
      include: {
        favoriteCharacters: true,
      },
    });

    return user;
  };

  static list = async () => {
    const users = await prisma.user.findMany({
      include: { favoriteCharacters: true },
    });

    return users.map((item) => formatUser(item));
  };

  static retrieve = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        favoriteCharacters: {
          include: { origin: true, location: true, episode: true },
        },
      },
    });

    return formatUser(user);
  };

  static update = async (id: string, data: IUpdateUser) => {
    data.password && (data.password = bcrypt.hashSync(data.password, 10));

    let favoriteCharacters: any;

    // Pega o personagem se existe, se não, cria um novo
    if (data.favoriteCharacters) {
      const allCharactersCreated = await Promise.all(
        data.favoriteCharacters.map(async (character) => {
          const characterExists = await FavoriteCharacterService.retrieve(
            character.id
          );

          if (characterExists) {
            return characterExists;
          }

          const characterCreated = await FavoriteCharacterService.create(
            character
          );

          return characterCreated;
        })
      );

      favoriteCharacters = {
        set: [],
        connect: allCharactersCreated.map((character) => ({
          id: character.id,
        })),
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...data, favoriteCharacters },
      include: {
        favoriteCharacters: true,
      },
    });

    return formatUser(updatedUser);
  };

  static delete = async (id: string) => {
    await prisma.user.delete({ where: { id } });

    return;
  };
}

export default UserService;
