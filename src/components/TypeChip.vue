<template>
  <q-chip
    v-if="store.typeData !== undefined"
    :class="props.type"
    data-cy="chip-type"
  >
    {{ getNameByLanguage(props.type) }}
  </q-chip>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useTypeStore } from 'src/stores/type-store';
import { onBeforeMount } from 'vue';

const store = useTypeStore();
const { getNameByLanguage } = storeToRefs(store);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

onBeforeMount(async () => {
  await store.loadTypeData();
});
</script>
