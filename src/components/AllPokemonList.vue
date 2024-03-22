<template>
  <q-infinite-scroll @load="loadPokemons">
    <list-item-pokemon :pokemons="pokemons" />
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IPokemonListItem } from 'src/interfaces/IPokemonListItem';
import ListItemPokemon from './ListItemPokemon.vue';
import usePokemonStore from 'src/stores/pokemon-store';
import { useTypeStore } from 'src/stores/type-store';
import { onMounted } from 'vue';

const store = usePokemonStore();
const typeStore = useTypeStore();

const loadPokemons = async (index: number, done: CallableFunction) => {
  await store.loadPokemonDataGrouped(10, index);

  done();
};

const pokemons = computed(() => {
  let pokemon = <Array<IPokemonListItem>>[];
  for (const pokemonId in store.pokemonData) {
    const types = <Array<string>>[];
    // In order to get only the name of the type to make it easy to use it on the render site we're gonna take only the names
    store.pokemonData[pokemonId].types.forEach((type) => {
      if (typeStore.typeData[type.type.name] !== undefined) {
        types.push(type.type.name);
      }
    });

    // Getting the needed info only
    pokemon.push({
      id: store.pokemonData[pokemonId].id,
      name: store.pokemonData[pokemonId].name,
      sprite: store.pokemonData[pokemonId].sprites.front_default,
      types: types,
    });
  }
  return pokemon;
});

onMounted(async () => {
  await typeStore.loadTypeData();
});
</script>
