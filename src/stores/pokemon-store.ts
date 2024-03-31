import { defineStore } from 'pinia';
import { IPokemonResource } from 'src/interfaces/IPokemonResource';
import axios, { AxiosResponse } from 'axios';
import { Dialog } from 'quasar';
import { IPokemonList } from 'src/interfaces/IPokemonList';
import getIdFromUrl from 'src/composables/pokemonId';

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

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: <IPokemonList>{},
    pokemonData: <Array<IPokemonResource>>{},
  }),

  actions: {
    async loadPokemonList() {
      if (this.pokemonList.count === undefined) {
        const limit = 100000;
        await instance
          .get(`${baseUrl}`, {
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

    async loadPokemonData(pokemon: number) {
      if (this.pokemonData[pokemon] === undefined) {
        await instance
          .get(`${baseUrl}${pokemon}`)
          .then((response: AxiosResponse<IPokemonResource>) => {
            this.pokemonData[response.data.id] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async loadPokemonDataByName(pokemonName: string) {
      await this.loadPokemonList();
      const pokemonListItem = this.pokemonList.results.find(
        (item) => item.name.toLowerCase() === pokemonName.toLowerCase()
      );
      if (pokemonListItem === undefined) {
        // TODO Handle this error
        return false;
      }
      const pokemonId = getIdFromUrl(pokemonListItem.url);
      console.log('🚀 ~ loadPokemonDataByName ~ pokemonId:', pokemonId);
      await this.loadPokemonData(pokemonId);
      return this.pokemonData[pokemonId];
    },
  },
});

export default usePokemonStore;
