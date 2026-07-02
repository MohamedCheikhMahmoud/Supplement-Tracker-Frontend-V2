<script setup lang="ts">
import type { Supplement } from '@/types/Supplement'
import {
  Activity,
  Clock,
  Dumbbell,
  HeartPulse,
  Pencil,
  Pill,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
} from '@lucide/vue'

const props = defineProps<{
  supplement: Supplement
}>()

const emit = defineEmits<{
  deleteSupplement: [id: number]
  toggleSupplement: [id: number]
  editSupplement: [supplement: Supplement]
}>()

function getCategoryData(category: string) {
  const value = category.toLowerCase()

  if (value.includes('performance')) {
    return { icon: Activity, label: 'Performance', className: 'performance' }
  }

  if (value.includes('vitamin')) {
    return { icon: Sun, label: 'Vitamin', className: 'vitamin' }
  }

  if (value.includes('mineral')) {
    return { icon: ShieldCheck, label: 'Mineral', className: 'mineral' }
  }

  if (value.includes('recovery')) {
    return { icon: Sparkles, label: 'Recovery', className: 'recovery' }
  }

  if (value.includes('protein')) {
    return { icon: Dumbbell, label: 'Protein', className: 'protein' }
  }

  if (value.includes('health')) {
    return { icon: HeartPulse, label: 'Health', className: 'health' }
  }

  return { icon: Pill, label: category || 'Other', className: 'other' }
}

const categoryData = getCategoryData(props.supplement.category)
const CategoryIcon = categoryData.icon
</script>

<template>
  <article class="supplement-card glass-card">
    <div class="card-header">
      <div class="title-area">
        <div class="category-icon" :class="categoryData.className">
          <component :is="CategoryIcon" :size="24" />
        </div>

        <div>
          <h2>{{ supplement.name }}</h2>

          <span class="category-badge" :class="categoryData.className">
            <component :is="CategoryIcon" :size="14" />
            {{ categoryData.label }}
          </span>
        </div>
      </div>

      <span class="status" :class="{ taken: supplement.taken }">
        {{ supplement.taken ? 'Taken' : 'Open' }}
      </span>
    </div>

    <div class="details">
      <div class="detail-box">
        <Pill :size="18" />
        <span>{{ supplement.dosage }}</span>
      </div>

      <div class="detail-box">
        <Clock :size="18" />
        <span>{{ supplement.intakeTime }}</span>
      </div>
    </div>

    <p class="notes">
      {{ supplement.notes || 'No notes added.' }}
    </p>

    <div class="actions">
      <button class="edit-button" @click="emit('editSupplement', supplement)">
        <Pencil :size="18" />
        Edit
      </button>

      <button class="toggle-button" @click="emit('toggleSupplement', supplement.id!)">
        {{ supplement.taken ? 'Mark as Open' : 'Mark as Taken' }}
      </button>

      <button class="delete-button" @click="emit('deleteSupplement', supplement.id!)">
        <Trash2 :size="18" />
      </button>
    </div>
  </article>
</template>

<style scoped>
.supplement-card {
  padding: 28px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
}

.title-area {
  display: flex;
  align-items: center;
  gap: 14px;
}

.category-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  border: 1px solid;
}

.category-icon.vitamin,
.category-badge.vitamin {
  color: #facc15;
  background: rgba(250, 204, 21, 0.12);
  border-color: rgba(250, 204, 21, 0.28);
}

.category-icon.performance,
.category-badge.performance {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.12);
  border-color: rgba(96, 165, 250, 0.28);
}

.category-icon.health,
.category-badge.health {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.28);
}

.category-icon.protein,
.category-badge.protein {
  color: #fb923c;
  background: rgba(251, 146, 60, 0.12);
  border-color: rgba(251, 146, 60, 0.28);
}

.category-icon.mineral,
.category-badge.mineral {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.28);
}

.category-icon.recovery,
.category-badge.recovery {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.12);
  border-color: rgba(192, 132, 252, 0.28);
}

.category-icon.other,
.category-badge.other {
  color: #a855f7;
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.28);
}

h2 {
  margin: 0 0 8px;
  color: #f8fafc;
  font-size: 24px;
}

.category-badge {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  border: 1px solid;
}

.status {
  height: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.16);
  color: #fca5a5;
  font-size: 13px;
  font-weight: 900;
}

.status.taken {
  background: rgba(34, 197, 94, 0.16);
  color: #86efac;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 18px;
}

.detail-box {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e5e7eb;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
  padding: 13px;
  border-radius: 14px;
}

.detail-box svg {
  color: #a855f7;
}

.notes {
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 26px;
}

.actions {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.toggle-button {
  background: linear-gradient(135deg, #7e22ce, #a855f7);
}

.delete-button {
  width: 54px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.delete-button:hover {
  box-shadow: 0 14px 35px rgba(239, 68, 68, 0.32);
  background: linear-gradient(135deg, #ef4444, #f87171);
}

@media (max-width: 700px) {
  .details,
  .actions {
    grid-template-columns: 1fr;
  }

  .delete-button {
    width: 100%;
  }
}
</style>
