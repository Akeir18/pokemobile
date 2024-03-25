<template>
  <q-page padding>
    <p>{{ store.getNameByLanguage(pokedexId) }}</p>
    <p>{{ store.getDescriptionByLanguage(pokedexId) }}</p>
    <q-separator inset color="primary" />

    <display-pokemon-group
      :count="pokemonCount"
      :list="pokemonList"
      :pokedex-id="pokedexId"
      @load="loadPokemons"
    />
  </q-page>
</template>

<script setup lang="ts">
import DisplayPokemonGroup from 'src/components/DisplayPokemonGroup.vue';
import { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import usePokedexStore from 'src/stores/pokedex-store';
import { PokemonEntry } from 'src/interfaces/IPokedex';
import getIdFromUrl from 'src/composables/pokemonId';
import usePokemonStore from 'src/stores/pokemon-store';
import { ref } from 'vue';
import { computed } from 'vue';

const pokedexId = parseInt(useRoute().params.id as string);
const store = usePokedexStore();
const pokemonStore = usePokemonStore();
const pokemonList = <Ref<Array<number>>>ref([]);
const pokemonCount = computed(() => {
  if (store.pokedexData[pokedexId] !== undefined) {
    return store.pokedexData[pokedexId].pokemon_entries.length;
  }
  return 0;
});

// Functions that load the store
const loadPokemons = async (index: number) => {
  if (store.pokedexData[pokedexId] !== undefined) {
    const iterationArray = store.pokedexData[pokedexId].pokemon_entries.slice(
      0,
      10 * index
    );
    pokemonList.value = [];
    iterationArray.forEach((pokemon: PokemonEntry) => {
      const id = getIdFromUrl(pokemon.pokemon_species.url);
      pokemonStore.loadPokemonData(id);
      pokemonList.value.push(id);
    });
  }
};

onMounted(async () => {
  await store.loadPokedexData(pokedexId);
});
</script>
