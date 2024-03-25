import { defineStore } from 'pinia';
import { IPokedex } from 'src/interfaces/IPokedex';
import axios, { AxiosResponse } from 'axios';
import { Dialog } from 'quasar';
import { IPokedexList } from 'src/interfaces/IPokedexList';
import { useI18n } from 'vue-i18n';

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
        message: 'pokedexNotFound',
      });
    }
    // Pass the error to the next catch block
    return Promise.reject(error);
  }
);

const baseUrl = 'https://pokeapi.co/api/v2/pokedex/';
export const usePokedexStore = defineStore('pokedex', {
  state: () => ({
    pokedexList: <IPokedexList>{},
    pokedexData: <Array<IPokedex>>{},
  }),

  getters: {
    getNameByLanguage: (state) => {
      return (pokedexNumber: number) => {
        if (state.pokedexData[pokedexNumber] !== undefined) {
          const { locale } = useI18n();

          const pokedexLang = Object.values(
            state.pokedexData[pokedexNumber]?.names
          ).find((item) => item.language.name === locale.value);
          // Locale pokedex name
          if (pokedexLang !== undefined) {
            return pokedexLang?.name;
          }

          // If not found the locale pokedexname, we look for it in english and if not found, we set the base name
          const pokedexEng = Object.values(
            state.pokedexData[pokedexNumber]?.names
          ).find((item) => item.language.name === 'en');
          return pokedexEng?.name || state.pokedexData[pokedexNumber].name;
        }
      };
    },

    getDescriptionByLanguage: (state) => {
      return (pokedexNumber: number) => {
        if (state.pokedexData[pokedexNumber] !== undefined) {
          const { locale } = useI18n();

          const pokedexLang = Object.values(
            state.pokedexData[pokedexNumber]?.descriptions
          ).find((item) => item.language.name === locale.value);
          // Locale pokedex name
          if (pokedexLang !== undefined) {
            return pokedexLang?.description;
          }

          // If not found the locale pokedexname, we look for it in english and if not found, we set the base name
          const pokedexEng = Object.values(
            state.pokedexData[pokedexNumber]?.descriptions
          ).find((item) => item.language.name === 'en');
          return pokedexEng?.description || '';
        }
      };
    },

    getPokedexNumber: (state) => {
      return (pokedexNumber: number, pokemonName: string) => {
        const pokemon = state.pokedexData[pokedexNumber].pokemon_entries.find(
          (item) => item.pokemon_species.name == pokemonName
        );

        return pokemon?.entry_number ?? 0;
      };
    },
  },

  actions: {
    async loadPokedexList(limit: number, index: number) {
      if (this.pokedexList.next !== null) {
        limit = index * limit;
        await instance
          .get(`${baseUrl}`, {
            params: {
              limit: limit,
              offset: 0,
            },
          })
          .then((response: AxiosResponse<IPokedexList>) => {
            this.pokedexList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async loadPokedexData(pokedex: number) {
      if (this.pokedexData[pokedex] === undefined) {
        await instance
          .get(`${baseUrl}${pokedex}`)
          .then((response: AxiosResponse<IPokedex>) => {
            this.pokedexData[response.data.id] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});

export default usePokedexStore;
