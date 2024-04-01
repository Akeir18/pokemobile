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

        <q-tabs v-model="tab" no-caps>
          <q-tab name="basic" :label="$t('basicData')" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="basic">
            <!-- TODO -->
            <p class="text-bold">{{ $t('dimensions') }}</p>
            <p>
              {{ $t('height') }}: {{ (pokemon.height * 10).toFixed(2) }} cm /
              {{ (pokemon.height * 3.937008).toFixed(2) }} in
            </p>
            <p>
              {{ $t('weight') }}: {{ (pokemon.weight / 10).toFixed(2) }} Kg /
              {{ (pokemon.weight / 0.2204623).toFixed(2) }} Lbs
            </p>
            <p>
              {{ $t('catchRate') }}:
              {{ ((pokemon.catchRate / 255) * 100).toFixed(2) }} %
            </p>
            <p>
              {{ $t('baseHappiness') }}:
              {{ ((pokemon.baseHappiness / 255) * 100).toFixed(2) }} %
            </p>

            <!-- <q-separator />
            {{ pokemon }} -->
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

const props = defineProps({
  pokemon: Object,
  locale: { type: String, required: true },
});

const { pokemon, locale } = toRefs(props);

const tab = ref<string>('basic');
</script>
