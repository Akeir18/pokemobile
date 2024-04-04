<template>
  <q-list>
    <!-- Height -->
    <list-item-avatar
      :label="`${$t('height')}: ${pokemon.heightCm.toFixed(2)} cm /
          ${pokemon.heightIn.toFixed(2)} in`"
      icon="height"
    />

    <!-- Weight -->
    <list-item-avatar
      :label="`${$t('weight')}: ${pokemon.weightKg.toFixed(2)} kg
                  / ${pokemon.weightLbs.toFixed(2)} Lbs`"
      icon="scale"
    />

    <!-- EXP -->
    <list-item-avatar
      :label="`${$t('experienceGained')}:
    ${pokemon.experienceGained}`"
      icon="arrow_upward"
    />

    <!-- Default pokemon -->
    <!-- We set a plural translate for that, so, we make the +bool and if is 0 (false) it shows the plural else if is 1 (true) shows the singular -->
    <list-item-avatar
      :label="$t('defaultPokemon', +pokemon.defaultPokemon)"
      :icon="pokemon.defaultPokemon ? 'check' : 'close'"
    />

    <!-- Happiness -->
    <list-item-avatar
      :label="`${$t('baseHappiness')}: ${pokemon.baseHappinessPercent.toFixed(
        2
      )}% (${pokemon.baseHappiness} / 255)`"
      icon="favorite"
    />

    <!-- Baby -->
    <!-- We set a plural translate for that, so, we make the +bool and if is 0 (false) it shows the plural else if is 1 (true) shows the singular -->
    <list-item-avatar :label="$t('isBaby', +pokemon.isBaby)" icon="crib" />

    <!-- Catch rate -->
    <list-item-avatar
      :label="`${$t('catchRate')}: ${
        pokemon.catchRate
      } (${pokemon.catchRatePercent.toFixed(2)}%)`"
      icon="catching_pokemon"
    />

    <!-- Gender rate -->
    <list-item-avatar
      :label="`${$t('femaleRate')}:
    ${pokemon.genderRateFemale.toFixed(2)}%`"
      icon="female"
    />
    <list-item-avatar
      :label="`${$t('maleRate')}:
    ${pokemon.genderRateMale.toFixed(2)}%`"
      icon="male"
    />

    <!-- Visual differences -->
    <!-- We set a plural translate for that, so, we make the +bool and if is 0 (false) it shows the plural else if is 1 (true) shows the singular -->
    <list-item-avatar
      :label="$t('hasVisualChanges', +pokemon.visualDifferences)"
      :icon="pokemon.visualDifferences ? 'visibility' : 'visibility_off'"
    />

    <!-- Form changes -->
    <!-- We set a plural translate for that, so, we make the +bool and if is 0 (false) it shows the plural else if is 1 (true) shows the singular -->
    <list-item-avatar
      :label="`${$t('hasFormChange', +pokemon.formChange)}`"
      :icon="pokemon.formChange ? 'change_circle' : 'circle'"
    />

    <!-- Hatch cycles -->
    <list-item-avatar
      :label="`${$t('hatchCycles')}: ${pokemon.hatchCycles}`"
      icon="egg"
    />
  </q-list>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ListItemAvatar from './ListItemAvatar.vue';

const props = defineProps({
  pokemon: { type: Object, required: true },
});
const { pokemon } = toRefs(props);
</script>
