import { defineStore } from 'pinia';
import { IPokemon } from 'src/interfaces/IPokemon';
import axios, { AxiosResponse } from 'axios';
import { Dialog } from 'quasar';
import { IPokemonList } from 'src/interfaces/IPokemonList';

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
        message: 'todo.pokemonNotFound',
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
    pokemonData: <Array<IPokemon>>{},
  }),

  actions: {
    async loadPokemonList() {
      if (this.pokemonList.count === undefined) {
        await instance
          .get(`${baseUrl}`, {
            params: {
              limit: 1000000,
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

    async loadPokemonDataGrouped(offset: number, index: number) {
      // try {
      let pokemonId = (index - 1) * offset + 1;
      offset = pokemonId + offset;
      for (pokemonId; pokemonId < offset; pokemonId++) {
        await this.loadPokemonData(pokemonId);
      }
    },

    async loadPokemonData(pokemon: number) {
      if (this.pokemonData[pokemon] === undefined) {
        await instance
          .get(`${baseUrl}${pokemon}`)
          .then((response: AxiosResponse<IPokemon>) => {
            this.pokemonData[response.data.id] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});

export default usePokemonStore;
