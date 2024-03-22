<template>
  <q-list padding class="menu-list">
    <!-- Pokemons -->
    <q-expansion-item :label="$t('todo.pokemon')" icon="catching_pokemon">
      <!-- Pokemon -->
      <q-item v-ripple clickable :to="{ name: 'allPokemon' }" inset-level="1">
        <q-item-section avatar>
          <q-icon name="pets" />
        </q-item-section>

        <q-item-section> {{ $t('todo.allPokemon') }} </q-item-section>
      </q-item>
    </q-expansion-item>
  </q-list>
</template>

<script setup></script>
