<template>
  <q-list padding class="menu-list">
    <!-- Pokemons -->
    <q-item v-ripple clickable :to="{ name: 'allPokemon' }">
      <q-item-section avatar>
        <q-icon name="catching_pokemon" />
      </q-item-section>

      <q-item-section> {{ $t('allPokemon') }} </q-item-section>
    </q-item>

    <!-- Pokedexes -->
    <q-item v-ripple clickable :to="{ name: 'allPokedex' }">
      <q-item-section avatar>
        <q-icon name="smartphone" />
      </q-item-section>
      <q-item-section> {{ $t('allPokedex') }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup></script>
