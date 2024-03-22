<template>
  <div class="row">
    <q-card
      class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1"
      v-for="pokemon in pokemons"
      :key="pokemon.id"
    >
      <img :src="pokemon.sprite" />

      <q-card-section>
        <div class="text-h6 text-center">
          #{{ pad(pokemon.id, 4) }} {{ capitalize(pokemon.name) }}
        </div>
        <div class="text-subtitle2 text-center">
          <q-chip v-for="type in pokemon.types" :key="type" :class="type">
            {{ getNameByLanguage(type) }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { format } from 'quasar';
import { useTypeStore } from 'src/stores/type-store';
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);
console.log('🚀 ~ pokemons:', pokemons);

const { pad, capitalize } = format;

const store = useTypeStore();
const { getNameByLanguage } = storeToRefs(store);
</script>
