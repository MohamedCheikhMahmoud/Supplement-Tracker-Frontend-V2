<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Supplement } from '@/types/Supplement'
import {
  deleteSupplement,
  filterSupplements,
  getSupplements,
  toggleSupplement,
  updateSupplement,
} from '@/services/api'

import SupplementCard from '@/components/SupplementCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import FilterBar from '@/components/FilterBar.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import EditSupplementModal from '@/components/EditSupplementModal.vue'

const supplements = ref<Supplement[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

const showDeleteDialog = ref(false)
const supplementToDelete = ref<Supplement | null>(null)

const showEditModal = ref(false)
const supplementToEdit = ref<Supplement | null>(null)

const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

async function loadSupplements() {
  loading.value = true
  supplements.value = await getSupplements()
  loading.value = false
}

async function applyFilters() {
  loading.value = true
  supplements.value = await filterSupplements(
    searchQuery.value,
    selectedCategory.value,
    selectedStatus.value,
  )
  loading.value = false
}

function openDeleteDialog(id: number) {
  const supplement = supplements.value.find((item) => item.id === id)

  if (!supplement) {
    showToast('Supplement not found.', 'error')
    return
  }

  supplementToDelete.value = supplement
  showDeleteDialog.value = true
}

function closeDeleteDialog() {
  showDeleteDialog.value = false
  supplementToDelete.value = null
}

async function confirmDelete() {
  if (!supplementToDelete.value?.id) return

  await deleteSupplement(supplementToDelete.value.id)
  closeDeleteDialog()
  await applyFilters()

  showToast('Supplement deleted successfully.', 'success')
}

function openEditModal(supplement: Supplement) {
  supplementToEdit.value = supplement
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  supplementToEdit.value = null
}

async function saveEdit(updatedSupplement: Supplement) {
  if (!updatedSupplement.id) return

  await updateSupplement(updatedSupplement.id, updatedSupplement)
  closeEditModal()
  await applyFilters()

  showToast('Supplement updated successfully.', 'success')
}

async function handleToggle(id: number) {
  await toggleSupplement(id)
  await applyFilters()

  showToast('Supplement status updated.', 'success')
}

function showToast(message: string, type: 'success' | 'error') {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true

  window.setTimeout(() => {
    toastVisible.value = false
  }, 2600)
}

watch([searchQuery, selectedCategory, selectedStatus], () => {
  applyFilters()
})

onMounted(() => {
  loadSupplements()
})
</script>

<template>
  <div class="supplement-section">
    <div class="toolbar glass-card">
      <SearchBar v-model="searchQuery" />

      <FilterBar v-model:category="selectedCategory" v-model:taken="selectedStatus" />
    </div>

    <p v-if="loading" class="info">Loading supplements...</p>

    <p v-else-if="supplements.length === 0" class="empty">No supplements found.</p>

    <div v-else class="list">
      <SupplementCard
        v-for="supplement in supplements"
        :key="supplement.id"
        :supplement="supplement"
        @delete-supplement="openDeleteDialog"
        @toggle-supplement="handleToggle"
        @edit-supplement="openEditModal"
      />
    </div>

    <ConfirmDialog
      :open="showDeleteDialog"
      title="Delete Supplement"
      :message="`Are you sure you want to delete ${supplementToDelete?.name || 'this supplement'}? This action cannot be undone.`"
      @close="closeDeleteDialog"
      @confirm="confirmDelete"
    />

    <EditSupplementModal
      :open="showEditModal"
      :supplement="supplementToEdit"
      @close="closeEditModal"
      @save="saveEdit"
    />

    <ToastNotification
      :show="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />
  </div>
</template>

<style scoped>
.supplement-section {
  display: grid;
  gap: 28px;
}

.toolbar {
  padding: 22px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 26px;
}

.info,
.empty {
  color: #cbd5e1;
  font-size: 18px;
  padding: 24px;
  border: 1px dashed rgba(168, 85, 247, 0.35);
  border-radius: 18px;
  text-align: center;
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}
</style>
