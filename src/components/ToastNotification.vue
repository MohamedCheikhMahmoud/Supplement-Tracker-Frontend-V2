<script setup lang="ts">
import { CheckCircle, CircleAlert, X } from '@lucide/vue'

defineProps<{
  show: boolean
  message: string
  type?: 'success' | 'error'
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="toast" :class="type || 'success'">
      <CheckCircle v-if="type !== 'error'" :size="22" />
      <CircleAlert v-else :size="22" />

      <span>{{ message }}</span>

      <button @click="emit('close')">
        <X :size="16" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 28px;
  top: 100px;
  z-index: 120;
  min-width: 280px;
  padding: 16px 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  animation: slideIn 0.25s ease;
  backdrop-filter: blur(16px);
}

.toast.success {
  background: rgba(34, 197, 94, 0.18);
  border: 1px solid rgba(34, 197, 94, 0.35);
}

.toast.error {
  background: rgba(239, 68, 68, 0.18);
  border: 1px solid rgba(239, 68, 68, 0.35);
}

span {
  flex: 1;
  font-weight: 700;
}

button {
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
