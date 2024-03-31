<template>
  <q-page padding>
    <display-pokemon-group
      :count="sentPokemons"
      :list="pokemonList"
      @load="loadPokemons"
    />
  </q-page>
</template>

<script setup lang="ts">
import DisplayPokemonGroup from 'src/components/DisplayPokemonGroup.vue';
import usePokemonStore from 'src/stores/pokemon-store';
import getIdFromUrl from 'src/composables/pokemonId';
import { computed } from 'vue';
import { ref } from 'vue';

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

const sentPokemons = ref(0);
// Functions that load the store
const loadPokemons = async (index: number) => {
  // Quantity of pokemons that we're gonna pull
  const offset = 10;
  // Loading the full pokemon list (if it's not empty it does not pull anything)
  await store.loadPokemonList();

  // Getting the pokemons that we're gonna fetch from the pokemon list
  const pullPokemons = store.pokemonList.results.slice(0, offset * index);
  // Counting the pokemons that we're gonna pull in order to know if there are more pokemons or not
  sentPokemons.value = pullPokemons.length;
  // Looping through the gotten pokemons to get the info of them
  pullPokemons.forEach(async (pokemon) => {
    const id = getIdFromUrl(pokemon.url);
    store.loadPokemonData(id);
  });
};
</script>
