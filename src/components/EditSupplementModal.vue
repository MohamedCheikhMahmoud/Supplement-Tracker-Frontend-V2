<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Supplement } from '@/types/Supplement'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps<{
  open: boolean
  supplement: Supplement | null
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
const taken = ref(false)

watch(
  () => props.supplement,
  (supplement) => {
    if (!supplement) return

    name.value = supplement.name
    category.value = supplement.category
    dosage.value = supplement.dosage
    intakeTime.value = supplement.intakeTime
    notes.value = supplement.notes
    taken.value = supplement.taken
  },
  { immediate: true },
)

function submitEdit() {
  if (!props.supplement) return

  emit('save', {
    ...props.supplement,
    name: name.value,
    category: category.value,
    dosage: dosage.value,
    intakeTime: intakeTime.value,
    notes: notes.value,
    taken: taken.value,
  })
}
</script>

<template>
  <BaseModal :open="open" title="Edit Supplement" @close="emit('close')">
    <form class="edit-form" @submit.prevent="submitEdit">
      <input v-model="name" placeholder="Supplement name" required />
      <input v-model="category" placeholder="Category" required />
      <input v-model="dosage" placeholder="Dosage" required />
      <input v-model="intakeTime" placeholder="Intake time" required />
      <textarea v-model="notes" placeholder="Notes"></textarea>

      <div class="status-section">
        <label>Status</label>

        <div class="status-buttons">
          <button
            type="button"
            class="status-button"
            :class="{ active: !taken }"
            @click="taken = false"
          >
            Open
          </button>

          <button
            type="button"
            class="status-button"
            :class="{ active: taken }"
            @click="taken = true"
          >
            Taken
          </button>
        </div>
      </div>

      <div class="actions">
        <button type="button" class="secondary-button" @click="emit('close')">Cancel</button>

        <button type="submit">Save Changes</button>
      </div>
    </form>
  </BaseModal>
</template>

<style scoped>
.edit-form {
  display: grid;
  gap: 16px;
}

textarea {
  min-height: 90px;
  resize: vertical;
}

.status-section {
  display: grid;
  gap: 10px;
}

.status-section label {
  color: #f8fafc;
  font-weight: 800;
}

.status-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.status-button {
  border-radius: 14px;
  padding: 14px;
  font-weight: 800;
  transition: all 0.25s ease;
}

/* Open */
.status-button:first-child {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fca5a5;
}

.status-button:first-child:hover {
  background: rgba(239, 68, 68, 0.18);
  transform: translateY(-2px);
}

.status-button:first-child.active {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: white;
  border-color: #ef4444;
  box-shadow: 0 12px 28px rgba(239, 68, 68, 0.35);
}

/* Taken */
.status-button:last-child {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #86efac;
}

.status-button:last-child:hover {
  background: rgba(34, 197, 94, 0.18);
  transform: translateY(-2px);
}

.status-button:last-child.active {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: white;
  border-color: #22c55e;
  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.35);
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
