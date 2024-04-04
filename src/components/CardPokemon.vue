<template>
  <div class="row">
    <q-card
      class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      @click="goToPokemon(pokemon.name)"
    >
      <q-img :src="pokemon.sprite" loading="lazy" />

      <q-card-section>
        <div class="text-h6 text-center">
          <span v-if="pokemon.pokedex !== 0">
            #{{ pad(pokemon.pokedex, 4) }}
          </span>
          {{ getNameByLanguage(pokemon.name) }}
        </div>
        <div class="text-subtitle2 text-center">
          <type-chip v-for="type in pokemon.types" :key="type" :type="type" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'quasar';
import { defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import TypeChip from './TypeChip.vue';
import { storeToRefs } from 'pinia';
import usePokemonStore from 'src/stores/pokemon-store';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);

const store = usePokemonStore();
const { getNameByLanguage } = storeToRefs(store);

const router = useRouter();

const { pad } = format;

const goToPokemon = (pokemonName: string) => {
  router.push({ name: 'pokemon', params: { pokemon: pokemonName } });
};
</script>
