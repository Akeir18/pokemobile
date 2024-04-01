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
            <q-item-label class="text-h4">
              {{ pokemon.names[locale] }}

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
import { toRefs } from 'vue';
import TypeChip from 'src/components/TypeChip.vue';

const props = defineProps({
  pokemon: Object,
  locale: { type: String, required: true },
});

const { pokemon, locale } = toRefs(props);
</script>
