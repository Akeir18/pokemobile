<template>
  <q-page padding>
    <display-pokemon-group :list="pokemonList" @load="loadPokemons" />
  </q-page>
</template>

<script setup lang="ts">
import DisplayPokemonGroup from 'src/components/DisplayPokemonGroup.vue';
import usePokemonStore from 'src/stores/pokemon-store';
import getIdFromUrl from 'src/composables/pokemonId';
import { computed } from 'vue';

const store = usePokemonStore();

const pokemonList = computed(() => {
  const list = <Array<number>>[];

  if (store.pokemonList.results !== undefined) {
    store.pokemonList.results.forEach((pokemon) => {
      list.push(getIdFromUrl(pokemon.url));
      return;
    });
  }
  return list;
});

// Functions that load the store
const loadPokemons = async (index: number) => {
  await store.loadPokemonList(10, index);
  store.pokemonList.results.forEach((pokemon) => {
    const id = getIdFromUrl(pokemon.url);
    store.loadPokemonData(id);
  });
};
</script>
