<template>
  <q-page>
    <!-- backgroundImage: pokemon.sprites.front_default -->
    <div
      v-if="pokemon !== undefined"
      class="q-ma-none q-pa-md"
      :style="{
        backgroundImage: `url(${pokemon.sprites.front_default})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }"
    >
      <q-card>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="pokemon.sprites.front_default" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h4 text-capitalize">
              {{ pokemon.name }}

              <type-chip
                v-for="type in pokemon.types"
                :key="type.type.name"
                :type="type.type.name"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import usePokemonStore from 'src/stores/pokemon-store';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TypeChip from 'src/components/TypeChip.vue';

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
