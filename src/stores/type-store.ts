import { ITypeArray } from './../interfaces/ITypeArray';
import { ITypeList } from './../interfaces/ITypeList';
import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { Dialog } from 'quasar';
import { IType } from 'src/interfaces/IType';

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
        message: 'todo.typeNotFound',
      });
    }
    // Pass the error to the next catch block
    return Promise.reject(error);
  }
);

const baseUrl = 'https://pokeapi.co/api/v2/type/';
export const useTypeStore = defineStore('counter', {
  state: () => ({
    typeData: <ITypeArray>{},
  }),

  getters: {
    // TODO GETTER THAT SEARCH BY THE LANGUAGE SO I CAN GET EASILY THE NAME
    getNameByLanguage: (state) => {
      return (type: string) => {
        const typeName = Object.values(state.typeData[type]?.names).find(
          (item) => item.language.name === 'es'
        );
        return typeName?.name || type;
      };
    },
  },

  actions: {
    async loadTypeData() {
      // TODO CHECK IF EMPTY TO LOAD THE DATA
      if (this.typeData.normal === undefined) {
        let types = <ITypeList>{};
        await instance
          .get(`${baseUrl}?limit=100000`)
          .then((response: AxiosResponse<ITypeList>) => {
            types = response.data;
          });
        types.results.forEach(async ({ name }) => {
          await instance
            .get(`${baseUrl}${name}`)
            .then((response: AxiosResponse<IType>) => {
              this.typeData[response.data.name] = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        });
        console.log('test', this.typeData);
      }
    },
  },
});
