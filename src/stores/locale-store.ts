import { defineStore } from 'pinia';
import { Quasar } from 'quasar';

const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: Quasar.lang.getLocale()?.substring(0, 2) ?? '',
  }),

  persist: true,
  // TODO Add persistance
});

export default useLocaleStore;
