import { Sprites, Type } from './IPokemonResource';

export interface IPokemon {
  names: IPokemonNames;
  types: Type[];
  sprites: Sprites;
}

export interface IPokemonNames {
  [key: string]: string;
}
