<script setup lang="ts">
import { ref } from 'vue'
import { PlusCircle } from '@lucide/vue'
import AddSupplementModal from '@/components/AddSupplementModal.vue'
import SupplementList from '@/components/SupplementList.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import type { Supplement } from '@/types/Supplement'
import { createSupplement } from '@/services/api'

const listKey = ref(0)
const showAddModal = ref(false)

const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

function reloadList() {
  listKey.value++
}

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
}

async function saveSupplement(supplement: Supplement) {
  await createSupplement(supplement)

  closeAddModal()
  reloadList()
  showToast('Supplement added successfully.', 'success')
}

function showToast(message: string, type: 'success' | 'error') {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true

  window.setTimeout(() => {
    toastVisible.value = false
  }, 2600)
}
</script>

<template>
  <section class="supplements-page">
    <div class="page-header">
      <div>
        <p class="label">SUPPLEMENT MANAGEMENT</p>
        <h1 class="page-title">Supplements</h1>
        <p class="page-subtitle">
          Manage your supplement routine, track your intake and stay consistent.
        </p>
      </div>

      <button class="header-button" @click="openAddModal">
        <PlusCircle :size="20" />
        Add Supplement
      </button>
    </div>

    <SupplementList :key="listKey" />

    <AddSupplementModal :open="showAddModal" @close="closeAddModal" @save="saveSupplement" />

    <ToastNotification
      :show="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />
  </section>
</template>

<style scoped>
.supplements-page {
  max-width: 1250px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 28px;
  margin-bottom: 36px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
  margin: 0 0 12px;
}

.header-button {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

@media (max-width: 800px) {
  .supplements-page {
    padding: 0 16px;
    overflow-x: auto;
  }

  .page-header {
    flex-direction: row;
    min-width: 760px;
  }
}
</style>
