<script setup lang="ts">
import { Filter } from '@lucide/vue'

defineProps<{
  category: string
  taken: string
}>()

const emit = defineEmits<{
  'update:category': [value: string]
  'update:taken': [value: string]
}>()
</script>

<template>
  <div class="filter-bar">
    <div class="filter-title">
      <Filter :size="18" />
      <span>Filters</span>
    </div>

    <select
      :value="category"
      @change="emit('update:category', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">All Categories</option>
      <option value="Performance">Performance</option>
      <option value="Vitamin">Vitamin</option>
      <option value="Mineral">Mineral</option>
      <option value="Recovery">Recovery</option>
      <option value="Protein">Protein</option>
      <option value="Health">Health</option>
    </select>

    <select
      :value="taken"
      @change="emit('update:taken', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">All Status</option>
      <option value="true">Taken</option>
      <option value="false">Open</option>
    </select>
  </div>
</template>

<style scoped>
.filter-bar {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  gap: 14px;
}

.filter-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a855f7;
  font-weight: 800;
}

@media (max-width: 800px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }
}
</style>
