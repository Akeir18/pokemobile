import { defineStore } from 'pinia';
import { IPokemonResource } from 'src/interfaces/IPokemonResource';
import axios, { AxiosResponse } from 'axios';
import { Dialog } from 'quasar';
import { IPokemonList } from 'src/interfaces/IPokemonList';
import getIdFromUrl from 'src/composables/pokemonId';
import { IPokemonSpecy } from 'src/interfaces/IPokemonSpecy';
import { useI18n } from 'vue-i18n';
import { IPokemonResourceArray } from 'src/interfaces/IPokemonResourceArray';
import { IPokemonSpecyArray } from 'src/interfaces/IPokemonSpecyArray';
import { IPokemon, IPokemonNames } from 'src/interfaces/IPokemon';

// Creating the axios instance to create the interceptors
const instance = axios.create();

// The interceptor that will handle the 404 error
instance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it without any changes
    return response;
  },
  (error) => {
    // If an error occurs
    if (error.response && error.response.status === 404) {
      // Handle 404 errors here
      // TODO
      Dialog.create({
        title: 'Error',
        message: 'pokemonNotFound',
      });
    }
    // Pass the error to the next catch block
    return Promise.reject(error);
  }
);

const baseUrl = 'https://pokeapi.co/api/v2/';
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: <IPokemonList>{},
    pokemonData: <IPokemonResourceArray>{},
    pokemonSpecy: <IPokemonSpecyArray>{},
  }),

  getters: {
    getIPokemon: (state) => {
      return (pokemonName: string): IPokemon | undefined => {
        const pokemonSpeciesName = state.pokemonData[pokemonName].species.name;
        if (
          state.pokemonData[pokemonName] !== undefined &&
          state.pokemonSpecy[pokemonSpeciesName] !== undefined
        ) {
          const pokemonData = state.pokemonData[pokemonName];
          const pokemonSpecy = state.pokemonSpecy[pokemonSpeciesName];

          const pokemonNames: IPokemonNames = {};
          pokemonSpecy.names.forEach((name) => {
            pokemonNames[name.language.name] = name.name;
          });
          const pokemon: IPokemon = {
            names: pokemonNames,
            types: pokemonData.types,
            sprites: pokemonData.sprites,
          };

          return pokemon;
        }
        return undefined;
      };
    },

    getIdByName: (state) => {
      return (pokemonName: string): number => {
        const pokemonListItem = state.pokemonList.results.find(
          (item) => item.name.toLowerCase() === pokemonName.toLowerCase()
        );
        if (pokemonListItem === undefined) {
          // TODO Handle this error
          return 0;
        }
        return getIdFromUrl(pokemonListItem.url);
      };
    },

    // TODO GETTER THAT SEARCH BY THE LANGUAGE SO I CAN GET EASILY THE NAME
    getNameByLanguage: (state) => {
      return (pokemon: string) => {
        let pokemonName;
        if (state.pokemonSpecy[pokemon] !== undefined) {
          const { locale } = useI18n();
          pokemonName = Object.values(state.pokemonSpecy[pokemon]?.names).find(
            (item) => item.language.name === locale.value
          );
        }
        return pokemonName?.name || pokemon;
      };
    },
  },

  actions: {
    async loadPokemonList() {
      if (this.pokemonList.count === undefined) {
        const limit = 100000;
        await instance
          .get(`${baseUrl}pokemon/`, {
            params: {
              limit: limit,
              offset: 0,
            },
          })
          .then((response: AxiosResponse<IPokemonList>) => {
            this.pokemonList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async loadPokemonData(pokemon: string) {
      if (this.pokemonData[pokemon] === undefined) {
        await this.loadPokemonList();
        await instance
          .get(`${baseUrl}pokemon/${pokemon}`)
          .then((response: AxiosResponse<IPokemonResource>) => {
            this.pokemonData[response.data.name] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // async loadPokemonDataByName(pokemonName: string) {
    //   // TODO
    //   const pokemonId = this.getIdByName(pokemonName);
    //   await this.loadPokemonData(pokemonId);
    //   return this.pokemonData[pokemonId];
    // },

    async loadPokemonSpecy(pokemon: string) {
      if (this.pokemonSpecy[pokemon] === undefined) {
        await this.loadPokemonList();
        await instance
          .get(`${baseUrl}pokemon-species/${pokemon}`)
          .then((response: AxiosResponse<IPokemonSpecy>) => {
            this.pokemonSpecy[response.data.name] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // async loadPokemonSpecyByName(pokemonName: string) {
    //   const pokemonId = this.getIdByName(pokemonName);
    //   await this.loadPokemonSpecy(pokemonId);
    //   return this.pokemonSpecy[pokemonId];
    // },
  },
});

export default usePokemonStore;
