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
        <q-item-label>
          <pokedex-name :pokedex="pokemon.pokedex" :name="pokemon.name" />
        </q-item-label>
        <q-item-label>
          <type-chip v-for="type in pokemon.types" :key="type" :type="type" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import TypeChip from 'src/components/TypeChip.vue';
import PokedexName from 'src/components/PokedexName.vue';

const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);
</script>
