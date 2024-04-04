<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :name="icon" :color="color" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const { label, icon, color } = defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, default: 'primary' },
});
</script>
