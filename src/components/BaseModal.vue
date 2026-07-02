<script setup lang="ts">
import { X } from '@lucide/vue'

defineProps<{
  title: string
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="modal glass-card">
        <div class="modal-header">
          <h2>{{ title }}</h2>

          <button class="close-button" @click="emit('close')">
            <X :size="20" />
          </button>
        </div>

        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  padding: 24px;
}

.modal {
  width: min(560px, 100%);
  padding: 28px;
  animation: popIn 0.22s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  font-size: 28px;
}

.close-button {
  width: 42px;
  height: 42px;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
}

.modal-body {
  color: #cbd5e1;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
