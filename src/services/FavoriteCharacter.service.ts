import { ICreateFavoriteCharacter } from "./../interfaces/favoriteCharacter.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const includeAll = {
  origin: true,
  location: true,
  episode: true,
};

class FavoriteCharacterService {
  static create = async (data: ICreateFavoriteCharacter) => {
    const prisma = new PrismaClient();

    const favouriteCharacter = await prisma.favoriteCharacter.create({
      data: {
        ...data,
        origin: {
          connectOrCreate: {
            where: {
              name: data.origin.name,
            },
            create: {
              ...data.origin,
            },
          },
        },
        location: {
          connectOrCreate: {
            where: {
              name: data.location.name,
            },
            create: {
              ...data.location,
            },
          },
        },
        episode: {
          connectOrCreate: data.episode.map((url) => ({
            where: { url },
            create: { url },
          })),
        },
      },
      include: includeAll,
    });

    return favouriteCharacter;
  };

  static list = async () => {
    const favoriteCharacters = await prisma.favoriteCharacter.findMany({
      include: includeAll,
    });

    return favoriteCharacters;
  };

  static retrieve = async (id: number) => {
    const favoriteCharacter = await prisma.favoriteCharacter.findUnique({
      where: { id },
      include: includeAll,
    });

    return favoriteCharacter;
  };

  static update = async (id: number, data: ICreateFavoriteCharacter) => {
    const dataToUpdate: any = {
      ...data,
    };

    if (data.origin) {
      dataToUpdate.origin = {
        connectOrCreate: {
          where: {
            name: data.origin.name,
          },
          create: {
            ...data.origin,
          },
        },
      };
    }

    if (data.location) {
      dataToUpdate.location = {
        connectOrCreate: {
          where: {
            name: data.location.name,
          },
          create: {
            ...data.location,
          },
        },
      };
    }

    if (data.episode) {
      dataToUpdate.episode = {
        set: [],
        connectOrCreate: data.episode.map((url) => ({
          where: { url },
          create: { url },
        })),
      };
    }

    const updatedFavoriteCharacter = await prisma.favoriteCharacter.update({
      where: { id },
      data: dataToUpdate,
      include: includeAll,
    });

    return updatedFavoriteCharacter;
  };

  static delete = async (id: number) => {
    await prisma.favoriteCharacter.delete({ where: { id } });

    return;
  };
}

export default FavoriteCharacterService;
