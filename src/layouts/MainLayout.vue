<template>
  <q-layout view="hHh lpR fFf">
    <the-header @toggleDrawer="toggleLeftDrawer" />
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      padding
    >
      <the-navbar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import TheHeader from 'src/components/TheHeader.vue';
import TheNavbar from 'src/components/TheNavbar.vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
