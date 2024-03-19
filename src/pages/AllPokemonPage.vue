<template>
  <q-page padding>
    <q-infinite-scroll @load="loadPokemons">
      <list-item-pokemon :pokemons="store.pokemonData" />
      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import ListItemPokemon from 'src/components/ListItemPokemon.vue';
import { usePokemonStore } from 'src/stores/pokemon-store';

const store = usePokemonStore();

const loadPokemons = async (index: number, done: CallableFunction) => {
  await store.loadPokemonDataGrouped(10, index);
  done();
};
</script>
