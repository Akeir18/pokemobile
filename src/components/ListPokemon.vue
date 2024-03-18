<template>
  <q-list bordered separator>
    <q-item v-for="pokemon in pokemons" :key="pokemon.id">
      <q-item-section avatar>
        <q-avatar>
          <img :src="pokemon.sprites.front_default" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ pokemon.id }}
          {{ pokemon.name }}
          <q-chip v-for="typeInfo in pokemon.types" :key="typeInfo.slot">
            {{ typeInfo.type.name }}
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
const props = defineProps({
  pokemons: {
    type: Object,
    required: true,
  },
});
const { pokemons } = toRefs(props);
</script>
