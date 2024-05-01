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
import { shallowRef } from 'vue';
import { Ref, computed } from 'vue';

const store = usePokemonStore();

const pokemonList = <Ref<Array<string>>>shallowRef([]);

// Counting the pokemons that we're gonna pull in order to know if there are more pokemons or not
const sentPokemons = computed(() => {
  if (store.pokemonList !== undefined) {
    return store.pokemonList.count;
  }
  return 0;
});
// Functions that load the store
const loadPokemons = async (index: number) => {
  // Quantity of pokemons that we're gonna pull
  const offset = 10;
  // Loading the full pokemon list (if it's not empty it does not pull anything)
  await store.loadPokemonList();

  // Getting the pokemons that we're gonna fetch from the pokemon list
  pokemonList.value = [];
  const iterationArray = store.pokemonList.results.slice(0, offset * index);
  // Looping through the gotten pokemons to get the info of them
  iterationArray.forEach(async (pokemon) => {
    // const id = getIdFromUrl(pokemon.url);
    pokemonList.value.push(pokemon.name);
    store.loadPokemonData(pokemon.name);
    store.loadPokemonSpecy(pokemon.name);
  });
};
</script>
