export interface ICreatePlace {
  name: string;
  url: string;
}

export interface IPlace extends ICreatePlace {
  id: string;
}
