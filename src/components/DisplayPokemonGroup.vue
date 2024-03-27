<template>
  <div class="q-my-md flex justify-between items-center">
    <p class="q-ma-none">{{ $t('allPokemon') }}: {{ count }}</p>
    <q-btn-group>
      <q-btn
        color="accent"
        icon="list"
        data-cy="list-view"
        @click="pokemonComponent = listComponent"
      />
      <q-btn
        color="accent"
        icon="grid_view"
        data-cy="grid-view"
        @click="pokemonComponent = cardComponent"
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
      <div class="row justify-center q-my-md" v-if="count > list.length">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { IPokemonListItem } from 'src/interfaces/IPokemonListItem';
import usePokedexStore from 'src/stores/pokedex-store';
import usePokemonStore from 'src/stores/pokemon-store';
import { useTypeStore } from 'src/stores/type-store';
import {
  computed,
  defineAsyncComponent,
  onMounted,
  shallowRef,
  toRefs,
} from 'vue';

const props = defineProps({
  count: { type: Number, required: true },
  list: { type: Array<number>, required: true },
  pokedexId: { type: Number, required: false, default: null },
});
const { count, list, pokedexId } = toRefs(props);
const emit = defineEmits(['load']);

const store = usePokemonStore();
const typeStore = useTypeStore();
const pokedexStore = usePokedexStore();

// Functions that load the store
const loadPokemons = async (index: number, done: CallableFunction) => {
  if (count.value === 0) {
    done();
  }

  if (count.value !== list.value.length) {
    emit('load', index);
    done();
  }
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
        pokedex:
          pokedexId.value !== null
            ? pokedexStore.getPokedexNumber(
                pokedexId.value,
                store.pokemonData[pokemonId].name
              )
            : 0,
        name: store.pokemonData[pokemonId].name,
        sprite: store.pokemonData[pokemonId].sprites.front_default,
        types: types,
      });
    }
  }
  return pokemon;
});

const listComponent = defineAsyncComponent(() => import('./ListPokemon.vue'));
const cardComponent = defineAsyncComponent(() => import('./CardPokemon.vue'));
const pokemonComponent = shallowRef(listComponent);

// const switchComponent = (component: ) => {
//   pokemonComponent.value = component;
// };

onMounted(async () => {
  await typeStore.loadTypeData();
  // switchComponent(listComponent);
});
</script>
