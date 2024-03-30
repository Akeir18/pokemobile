<template>
  <q-list bordered separator>
    <q-item v-for="pokemon in pokemons" :key="pokemon.id">
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="pokemon.sprite" loading="lazy" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <span v-if="pokemon.pokedex !== 0">
            #{{ pad(pokemon.pokedex, 4) }}
          </span>
          {{ capitalize(pokemon.name) }}
          <type-chip v-for="type in pokemon.types" :key="type" :type="type" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { format } from 'quasar';
import { defineProps, toRefs } from 'vue';
import TypeChip from 'src/components/TypeChip.vue';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);

const { pad, capitalize } = format;
</script>
