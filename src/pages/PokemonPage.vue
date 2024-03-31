<template>
  <q-page padding>
    <div v-if="pokemon !== undefined">
      <q-img :src="pokemon.sprites.front_default" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import usePokemonStore from 'src/stores/pokemon-store';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const store = usePokemonStore();

const pokemon = ref();
onMounted(async () => {
  pokemon.value = await store.loadPokemonDataByName(
    route.params.pokemon.toString()
  );
  console.log('🚀 ~ onMounted ~ pokemon:', pokemon);
});
</script>
