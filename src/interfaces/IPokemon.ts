import { Sprites, Type } from './IPokemonResource';

export interface IPokemon {
  names: IPokemonNames;
  types: Type[];
  sprites: Sprites;
  height: number;
  weight: number;
  baseHappiness: number;
  catchRate: number;
}

export interface IPokemonNames {
  [key: string]: string;
}
