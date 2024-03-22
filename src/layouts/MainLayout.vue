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
      <the-language-switcher class="q-mx-md" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import TheHeader from 'src/components/TheHeader.vue';
import TheNavbar from 'src/components/TheNavbar.vue';
import TheLanguageSwitcher from 'src/components/TheLanguageSwitcher.vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
