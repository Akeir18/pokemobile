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
            </q-item-label>
            <q-item-label caption>
              <type-chip
                v-for="type in pokemon.types"
                :key="type.type.name"
                :type="type.type.name"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- General tabs -->
        <q-tabs v-model="tab" no-caps outside-arrows mobile-arrows>
          <q-tab name="basic" :label="$t('basicData')" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated swipeable infinite>
          <q-tab-panel name="basic">
            <the-pokemon-data :pokemon="pokemon" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import TypeChip from 'src/components/TypeChip.vue';
import { ref } from 'vue';
import ThePokemonData from 'src/components/ThePokemonData.vue';

const props = defineProps({
  pokemon: Object,
  locale: { type: String, required: true },
});

const { pokemon, locale } = toRefs(props);

const tab = ref<string>('basic');
</script>
