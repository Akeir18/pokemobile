import { Sprites, Type } from './IPokemonResource';

export interface IPokemon {
  names: IPokemonNames;
  types: Type[];
  sprites: Sprites;
  heightCm: number;
  heightIn: number;
  weightKg: number;
  weightLbs: number;
  baseHappiness: number;
  baseHappinessPercent: number;
  experienceGained: number;
  defaultPokemon: boolean;
  catchRate: number;
  catchRatePercent: number;
  genderRateMale: number;
  genderRateFemale: number;
  visualDifferences: boolean;
  formChange: boolean;
  hatchCycles: number;
  isBaby: boolean;
  color: string;
}

export interface IPokemonNames {
  [key: string]: string;
}
