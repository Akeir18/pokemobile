<template>
  <q-page>
    <pokemon-page-render :pokemon="pokemon" :locale="locale" />
  </q-page>
</template>

<script setup lang="ts">
import usePokemonStore from 'src/stores/pokemon-store';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PokemonPageRender from 'src/pages/PokemonPageRender.vue';
import { IPokemon } from 'src/interfaces/IPokemon';
import { useI18n } from 'vue-i18n';
import { onBeforeMount } from 'vue';

const route = useRoute();

const store = usePokemonStore();
const { locale } = useI18n();

const pokemonName = ref<string>('');
const pokemon = ref<IPokemon>();

onBeforeMount(() => {
  pokemonName.value = route.params.pokemon.toString();
});

onMounted(async () => {
  await store.loadPokemonData(pokemonName.value);
  const pokemonSpecy = store.pokemonData[pokemonName.value].species.name;
  console.log('🚀 ~ onMounted ~ pokemonSpecy:', pokemonSpecy);
  await store.loadPokemonSpecy(pokemonSpecy);

  pokemon.value = store.getIPokemon(pokemonName.value);
  console.log('🚀 ~ onMounted ~ pokemon.value:', pokemon.value);
});
</script>
