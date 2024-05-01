<template>
  <div v-if="name !== getNameByLanguage(name)">
    <span v-if="pokedex !== 0"> #{{ pad(pokedex.toString(), 4) }} </span>
    {{ getNameByLanguage(name) }}
  </div>
  <div v-else>
    <q-skeleton type="text" />
  </div>
  <!-- TODO Add the skeleton -->
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { format } from 'quasar';
import usePokemonStore from 'src/stores/pokemon-store';
import { toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  pokedex: {
    type: Number,
    required: true,
  },
});
const { name, pokedex } = toRefs(props);

const store = usePokemonStore();
const { getNameByLanguage } = storeToRefs(store);

const { pad } = format;
</script>
