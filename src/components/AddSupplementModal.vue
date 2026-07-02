<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Supplement } from '@/types/Supplement'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [supplement: Supplement]
}>()

const name = ref('')
const category = ref('')
const dosage = ref('')
const intakeTime = ref('')
const notes = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return

    name.value = ''
    category.value = ''
    dosage.value = ''
    intakeTime.value = ''
    notes.value = ''
  },
)

function submitForm() {
  emit('save', {
    name: name.value,
    category: category.value,
    dosage: dosage.value,
    intakeTime: intakeTime.value,
    notes: notes.value,
    taken: false,
  })
}
</script>

<template>
  <BaseModal :open="open" title="Add Supplement" @close="emit('close')">
    <form class="add-form" @submit.prevent="submitForm">
      <input v-model="name" placeholder="Supplement name" required />
      <input v-model="category" placeholder="Category" required />
      <input v-model="dosage" placeholder="Dosage" required />
      <input v-model="intakeTime" placeholder="Intake time" required />
      <textarea v-model="notes" placeholder="Notes"></textarea>

      <div class="actions">
        <button type="button" class="secondary-button" @click="emit('close')">Cancel</button>

        <button type="submit">Add Supplement</button>
      </div>
    </form>
  </BaseModal>
</template>

<style scoped>
.add-form {
  display: grid;
  gap: 16px;
}

textarea {
  min-height: 90px;
  resize: vertical;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.secondary-button {
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
}
</style>
