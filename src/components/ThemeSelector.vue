<template>
  <q-btn icon="contrast" flat @click="$q.dark.toggle()" round />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>
