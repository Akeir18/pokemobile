import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'allPokemon' },
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'allPokemon',
        component: () => import('pages/AllPokemonPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
