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
          <q-chip
            v-for="type in pokemon.types"
            :key="type"
            :class="type"
            data-cy="chip-type"
          >
            {{ getNameByLanguage(type) }}
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
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

const { pad, capitalize } = format;

const store = useTypeStore();
const { getNameByLanguage } = storeToRefs(store);
</script>
