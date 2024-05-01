<template>
  <div class="row">
    <q-card
      class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      @click="goToPokemon(pokemon.name)"
    >
      <q-img
        :src="pokemon.sprite"
        loading="lazy"
        v-if="pokemon.sprite !== ''"
      />
      <q-skeleton height="150px" square v-else />

      <q-card-section>
        <div class="text-h6 text-center">
          <pokedex-name :name="pokemon.name" :pokedex="pokemon.pokedex" />
        </div>
        <div class="text-subtitle2 flex flex-center">
          <type-chip v-for="type in pokemon.types" :key="type" :type="type" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import TypeChip from './TypeChip.vue';
import PokedexName from './PokedexName.vue';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);

const router = useRouter();

const goToPokemon = (pokemonName: string) => {
  router.push({ name: 'pokemon', params: { pokemon: pokemonName } });
};
</script>
