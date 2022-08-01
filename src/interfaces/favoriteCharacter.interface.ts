import { ICreateEpisode, IEpisode } from "./episode.interface";
import { ICreatePlace, IPlace } from "./place.interface";

export interface IFavoriteCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IPlace;
  location: IPlace;
  image: string;
  episode: IEpisode[];
  url: string;
  created: Date;
}

export interface ICreateFavoriteCharacter
  extends Omit<IFavoriteCharacter, "episode"> {
  episode: string[];
}

export interface ICreateFavoriteCharacterPrismaDataToCreate
  extends Omit<IFavoriteCharacter, "origin" | "episode" | "location"> {
  origin?: IPlace | { connect: { id: string } };
  location?: IPlace | {  connect: { id: string } };
  episode?: string[] | { set?: [], connect: { id: string }[] };
}

