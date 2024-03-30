<template>
  <q-chip :class="type" data-cy="chip-type">
    {{ getNameByLanguage(type) }}
  </q-chip>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTypeStore } from 'src/stores/type-store';
import { toRefs } from 'vue';

const store = useTypeStore();
const { getNameByLanguage } = storeToRefs(store);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const { type } = toRefs(props);
</script>
