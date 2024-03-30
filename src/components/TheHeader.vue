<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="$emit('toggleDrawer')"
        data-cy="toggle-drawer"
      />
      <q-avatar square>
        <img src="/favicon.ico" />
      </q-avatar>

      <q-space />

      <theme-selector />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import ThemeSelector from 'src/components/ThemeSelector.vue';
</script>
