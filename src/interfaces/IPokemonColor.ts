import { IApiResource } from './IApiResource';

export default interface IPokemonColor {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: IApiResource[];
}

export interface Name {
  language: IApiResource;
  name: string;
}
