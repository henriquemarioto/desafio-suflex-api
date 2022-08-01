import { ICreateFavoriteCharacter, IFavoriteCharacter } from "./favoriteCharacter.interface";

export interface ICreateUser {
  name: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  favoriteCharacters: IFavoriteCharacter[] | [];
}

export interface IUpdateUser extends ICreateUser {
  updatedAt: Date;
  favoriteCharacters?: ICreateFavoriteCharacter[];
}
