<template>
  <q-select
    v-model="locale"
    :options="options"
    :display-value="$t(`${locale}`)"
    emit-value
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IOption from 'src/interfaces/IOption';
import useLocaleStore from 'src/stores/locale-store';
import { watch } from 'vue';

const store = useLocaleStore();

const { locale } = useI18n({ useScope: 'global' });
const i18n = useI18n();

let options: Array<IOption> = [];
for (const locale of i18n.availableLocales) {
  options.push({
    label: i18n.t(`${locale}`),
    value: locale,
  });
}

// If the locale changes, we update it at the store
watch(locale, (newLocale) => {
  store.locale = newLocale;
});

if (store.locale.length > 0) {
  locale.value = store.locale;
}
</script>
