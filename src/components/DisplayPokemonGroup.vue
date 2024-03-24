<template>
  <div class="q-my-md flex justify-between items-center">
    <p class="q-ma-none">
      {{ $t('allPokemon') }}: {{ store.pokemonList.count }}
    </p>
    <q-btn-group>
      <q-btn
        color="primary"
        icon="list"
        @click="switchComponent(listComponent)"
      />
      <q-btn
        color="primary"
        icon="grid_view"
        @click="switchComponent(cardComponent)"
      />
    </q-btn-group>
  </div>

  <q-infinite-scroll @load="loadPokemons">
    <component
      :is="pokemonComponent"
      v-if="pokemons !== null"
      :pokemons="pokemons"
    />
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IPokemonListItem } from 'src/interfaces/IPokemonListItem';
import usePokemonStore from 'src/stores/pokemon-store';
import { useTypeStore } from 'src/stores/type-store';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { defineAsyncComponent } from 'vue';
import { toRefs } from 'vue';

const props = defineProps({
  list: { type: Array<number>, required: true },
});
const { list } = toRefs(props);
const emit = defineEmits(['load']);

const store = usePokemonStore();
const typeStore = useTypeStore();

// Functions that load the store
const loadPokemons = async (index: number, done: CallableFunction) => {
  emit('load', index);
  done();
};

// Functions that load the pokemon component
const pokemons = computed(() => {
  let pokemon = <Array<IPokemonListItem>>[];
  for (const pokemonId of list.value) {
    if (store.pokemonData[pokemonId] !== undefined) {
      const types = <Array<string>>[];
      // In order to get only the name of the type to make it easy to use it on the render site we're gonna take only the names
      store.pokemonData[pokemonId].types.forEach((type) => {
        if (typeStore.typeData[type.type.name] !== undefined) {
          types.push(type.type.name);
        }
      });
      // Getting the needed info only
      pokemon.push({
        id: store.pokemonData[pokemonId].id,
        name: store.pokemonData[pokemonId].name,
        sprite: store.pokemonData[pokemonId].sprites.front_default,
        types: types,
      });
    }
  }
  return pokemon;
});

const listComponent = './ListPokemon.vue';
const cardComponent = './CardPokemon.vue';
const pokemonComponent = ref();

const switchComponent = (component: string) => {
  pokemonComponent.value = defineAsyncComponent(() => import(component));
};

onMounted(async () => {
  await typeStore.loadTypeData();
  switchComponent(listComponent);
});
</script>