<template>
  <q-page padding>
    <q-infinite-scroll @load="loadPokedex">
      <q-list bordered separator>
        <q-item
          v-for="pokedex in store.pokedexData"
          :key="pokedex.id"
          v-ripple
          clickable
          :to="{ name: 'pokedex', params: { id: pokedex.id } }"
        >
          <q-item-section>
            <q-item-label>
              {{ getNameByLanguage(pokedex.id) }}
            </q-item-label>
            <q-item-label caption>
              {{ getDescriptionByLanguage(pokedex.id) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import getIdFromUrl from 'src/composables/pokemonId';
import usePokedexStore from 'src/stores/pokedex-store';

const store = usePokedexStore();
const { getNameByLanguage, getDescriptionByLanguage } = storeToRefs(store);

const loadPokedex = async (index: number, done: CallableFunction) => {
  await store.loadPokedexList(10, index);
  store.pokedexList.results.forEach(async (pokedex) => {
    const id = getIdFromUrl(pokedex.url);
    await store.loadPokedexData(id);
  });
  done();
};
</script>
