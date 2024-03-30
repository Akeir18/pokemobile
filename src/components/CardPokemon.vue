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
          {{ capitalize(pokemon.name) }}
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
import TypeChip from './TypeChip.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});

const { pokemons } = toRefs(props);

const router = useRouter();

const { pad, capitalize } = format;

const goToPokemon = (pokemonName: string) => {
  router.push({ name: 'pokemon', params: { pokemon: pokemonName } });
};
</script>
