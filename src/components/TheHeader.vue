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
        <img src="favicon.ico" />
      </q-avatar>

      <q-toolbar-title> PokeMobile </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup></script>
