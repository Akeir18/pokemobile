<template>
  <q-list bordered separator>
    <q-item
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      clickable
      :to="{ name: 'pokemon', params: { pokemon: pokemon.name } }"
    >
      <q-item-section avatar>
        <q-avatar v-if="pokemon.sprite !== ''">
          <q-img :src="pokemon.sprite" loading="lazy" />
        </q-avatar>
        <q-skeleton type="QAvatar" v-else />
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="pokemon.name !== getNameByLanguage(pokemon.name)">
          <span v-if="pokemon.pokedex !== 0">
            #{{ pad(pokemon.pokedex, 4) }}
          </span>
          {{ getNameByLanguage(pokemon.name) }}
        </q-item-label>
        <q-skeleton type="text" v-else />
        <q-item-label>
          <type-chip v-for="type in pokemon.types" :key="type" :type="type" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { format } from 'quasar';
import { defineProps, toRefs } from 'vue';
import TypeChip from 'src/components/TypeChip.vue';
import usePokemonStore from 'src/stores/pokemon-store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);

const store = usePokemonStore();
const { getNameByLanguage } = storeToRefs(store);

const { pad } = format;
</script>
