<template>
  <q-page padding>
    <q-infinite-scroll @load="loadPokemons">
      <list-pokemon :pokemons="store.pokemonData" />
      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import ListPokemon from 'src/components/ListPokemon.vue';
import { usePokemonStore } from 'src/stores/pokemon-store';
import { onMounted } from 'vue';

const store = usePokemonStore();

const loadPokemons = async (index: number, done: CallableFunction) => {
  await store.loadPokemonDataGrouped(10, index);
  done();
};
</script>
