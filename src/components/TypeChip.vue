<template>
  <q-chip :class="props.type" data-cy="chip-type">
    {{ getNameByLanguage(props.type) }}
  </q-chip>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useTypeStore } from 'src/stores/type-store';

const store = useTypeStore();
const { getNameByLanguage } = storeToRefs(store);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
