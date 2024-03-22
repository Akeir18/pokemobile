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
import { useQuasar } from 'quasar';
const { locale } = useI18n({ useScope: 'global' });
const i18n = useI18n();
let options: Array<IOption> = [];
for (const locale of i18n.availableLocales) {
  options.push({
    label: i18n.t(`${locale}`),
    value: locale,
  });
}
const $q = useQuasar();
const detectedLocale: string = $q.lang.getLocale() ?? '';
if (i18n.availableLocales.includes(detectedLocale)) {
  locale.value = detectedLocale;
}
</script>
