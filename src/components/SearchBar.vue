<script setup lang="ts">
import { Search, X } from '@lucide/vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function clearSearch() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search-wrapper">
    <Search class="search-icon" :size="20" />

    <input
      :value="modelValue"
      placeholder="Search supplements..."
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <button v-if="modelValue" class="clear-button" type="button" @click="clearSearch">
      <X :size="16" />
    </button>
  </div>
</template>

<style scoped>
.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a855f7;
}

input {
  padding-left: 48px;
  padding-right: 48px;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
}

.clear-button:hover {
  transform: translateY(-50%) scale(1.05);
}
</style>
