<script setup lang="ts">
import { ref } from 'vue'
import type { Supplement } from '@/types/Supplement'
import { createSupplement } from '@/services/api'

const emit = defineEmits<{
  supplementAdded: []
}>()

const name = ref('')
const category = ref('')
const dosage = ref('')
const intakeTime = ref('')
const notes = ref('')

async function submitForm() {
  const newSupplement: Supplement = {
    name: name.value,
    category: category.value,
    dosage: dosage.value,
    intakeTime: intakeTime.value,
    notes: notes.value,
    taken: false,
  }

  await createSupplement(newSupplement)

  name.value = ''
  category.value = ''
  dosage.value = ''
  intakeTime.value = ''
  notes.value = ''

  emit('supplementAdded')
}
</script>

<template>
  <form class="form glass-card" @submit.prevent="submitForm">
    <h2>Add New Supplement</h2>

    <input v-model="name" placeholder="Supplement name" required />
    <input v-model="category" placeholder="Category" required />
    <input v-model="dosage" placeholder="Dosage" required />
    <input v-model="intakeTime" placeholder="Intake time" required />
    <textarea v-model="notes" placeholder="Notes"></textarea>

    <button type="submit">Add Supplement</button>
  </form>
</template>

<style scoped>
.form {
  padding: 28px;
  margin-bottom: 36px;
  display: grid;
  gap: 16px;
}

h2 {
  margin: 0 0 8px;
  color: #f8fafc;
  font-size: 26px;
}
</style>
