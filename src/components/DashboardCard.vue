<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  value: string | number
  icon: Component
}>()
</script>

<template>
  <div class="dashboard-card glass-card">
    <component :is="icon" :size="34" class="card-icon" />

    <span>{{ title }}</span>
    <strong>{{ value }}</strong>
  </div>
</template>

<style scoped>
.dashboard-card {
  padding: 28px;
}

.card-icon {
  color: #a855f7;
}

span {
  display: block;
  color: #cbd5e1;
  margin: 18px 0 8px;
}

strong {
  font-size: 42px;
}
</style>
