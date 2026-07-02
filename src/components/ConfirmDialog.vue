<script setup lang="ts">
import { TriangleAlert } from '@lucide/vue'
import BaseModal from '@/components/BaseModal.vue'

defineProps<{
  open: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <BaseModal :open="open" :title="title" @close="emit('close')">
    <div class="confirm-content">
      <div class="warning-icon">
        <TriangleAlert :size="32" />
      </div>

      <p>{{ message }}</p>

      <div class="actions">
        <button class="secondary-button" @click="emit('close')">Cancel</button>

        <button class="danger-button" @click="emit('confirm')">Delete</button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.confirm-content {
  display: grid;
  gap: 22px;
}

.warning-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: #f87171;
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.25);
}

p {
  color: #cbd5e1;
  line-height: 1.7;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.secondary-button {
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.danger-button {
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.danger-button:hover {
  box-shadow: 0 14px 35px rgba(239, 68, 68, 0.32);
  background: linear-gradient(135deg, #ef4444, #f87171);
}
</style>
