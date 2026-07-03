<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Award, CheckCircle, Clock3, Flame, Medal, Pill, Trophy } from '@lucide/vue'
import DashboardCard from '@/components/DashboardCard.vue'
import type { Supplement } from '@/types/Supplement'
import { getSupplements } from '@/services/api'

const supplements = ref<Supplement[]>([])

// später kommt der Name vom eingeloggten Benutzer
const username = ref(localStorage.getItem('username') || 'User')

onMounted(async () => {
  supplements.value = await getSupplements()
})

const greeting = computed(() => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return {
      text: 'Good Morning',
      emoji: '🌅',
    }
  }

  if (hour >= 12 && hour < 18) {
    return {
      text: 'Good Afternoon',
      emoji: '☀️',
    }
  }

  return {
    text: 'Good Evening',
    emoji: '🌙',
  }
})

const total = computed(() => supplements.value.length)
const taken = computed(() => supplements.value.filter((s) => s.taken).length)
const open = computed(() => total.value - taken.value)

const completion = computed(() => {
  if (total.value === 0) return 0
  return Math.round((taken.value / total.value) * 100)
})

const todaySchedule = computed(() => {
  return [...supplements.value]
    .filter((supplement) => supplement.intakeTime)
    .sort((a, b) => a.intakeTime.localeCompare(b.intakeTime))
    .slice(0, 5)
})

const achievements = computed(() => [
  {
    title: 'First Supplement',
    description: total.value > 0 ? 'Unlocked' : 'Add your first supplement',
    unlocked: total.value > 0,
    icon: Medal,
  },
  {
    title: '7 Day Streak',
    description: taken.value >= 7 ? 'Unlocked' : 'Keep tracking your routine',
    unlocked: taken.value >= 7,
    icon: Flame,
  },
  {
    title: '100 Supplements Taken',
    description: taken.value >= 100 ? 'Unlocked' : `${taken.value}/100 completed`,
    unlocked: taken.value >= 100,
    icon: Trophy,
  },
])
</script>

<template>
  <section class="dashboard">
    <div class="hero">
      <p class="label">DASHBOARD</p>

      <h1>{{ greeting.emoji }} {{ greeting.text }}, {{ username }} 👋</h1>

      <p>Here is your supplement progress for today.</p>
    </div>

    <div class="cards">
      <DashboardCard title="Taken" :value="taken" :icon="CheckCircle" />
      <DashboardCard title="Total" :value="total" :icon="Pill" />
      <DashboardCard title="Open" :value="open" :icon="Clock3" />
      <DashboardCard title="Completion" :value="completion + '%'" :icon="Award" />
    </div>

    <div class="dashboard-grid">
      <div class="glass-card progress-card">
        <div class="progress-header">
          <h2>Today's Progress</h2>
          <span>{{ completion }}%</span>
        </div>

        <div class="progress">
          <div class="progress-fill" :style="{ width: completion + '%' }"></div>
        </div>

        <p>{{ taken }} of {{ total }} supplements completed.</p>
      </div>

      <div class="glass-card schedule-card">
        <h2>Today’s Schedule</h2>

        <div v-if="todaySchedule.length === 0" class="empty">No supplements scheduled yet.</div>

        <div v-else class="schedule-list">
          <div v-for="supplement in todaySchedule" :key="supplement.id" class="schedule-item">
            <span class="time">{{ supplement.intakeTime }}</span>

            <div>
              <strong>{{ supplement.name }}</strong>
              <p>{{ supplement.dosage }}</p>
            </div>

            <span class="mini-status" :class="{ taken: supplement.taken }">
              {{ supplement.taken ? 'Taken' : 'Open' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card achievements-card">
      <h2>Achievements</h2>

      <div class="achievement-grid">
        <div
          v-for="achievement in achievements"
          :key="achievement.title"
          class="achievement"
          :class="{ unlocked: achievement.unlocked }"
        >
          <component :is="achievement.icon" :size="30" />
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  max-width: 1300px;
  margin: auto;
}

.hero {
  margin-bottom: 45px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
  margin: 0;
}

h1 {
  font-size: 56px;
  margin: 10px 0;
}

.hero p,
.progress-card p,
.empty {
  color: #cbd5e1;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 22px;
  margin-bottom: 28px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
  margin-bottom: 28px;
}

.progress-card,
.schedule-card,
.achievements-card {
  padding: 30px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-header h2,
.schedule-card h2,
.achievements-card h2 {
  margin: 0 0 22px;
}

.progress-header span {
  font-weight: bold;
  color: #a855f7;
  font-size: 22px;
}

.progress {
  margin-top: 25px;
  height: 16px;
  border-radius: 100px;
  overflow: hidden;
  background: #111827;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7e22ce, #a855f7, #c084fc);
  transition: width 0.4s;
}

.schedule-list {
  display: grid;
  gap: 14px;
}

.schedule-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.time {
  color: #a855f7;
  font-weight: 900;
}

.schedule-item strong {
  color: #f8fafc;
}

.schedule-item p {
  margin: 4px 0 0;
  color: #cbd5e1;
}

.mini-status {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.16);
}

.mini-status.taken {
  color: #86efac;
  background: rgba(34, 197, 94, 0.16);
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.achievement {
  padding: 22px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
  opacity: 0.65;
}

.achievement.unlocked {
  opacity: 1;
  border-color: rgba(168, 85, 247, 0.35);
}

.achievement svg {
  color: #a855f7;
}

.achievement h3 {
  margin: 14px 0 8px;
}

.achievement p {
  color: #cbd5e1;
  margin: 0;
}

@media (max-width: 950px) {
  .dashboard {
    padding: 0 16px;
  }

  h1 {
    font-size: 40px;
  }

  .cards {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
    overflow-x: auto;
  }

  .dashboard-grid {
    grid-template-columns: 1.2fr 1fr;
    overflow-x: auto;
  }

  .progress-card,
  .schedule-card,
  .achievements-card {
    min-width: 360px;
  }

  .achievement-grid {
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    overflow-x: auto;
  }

  .schedule-item {
    grid-template-columns: 80px 1fr auto;
    min-width: 420px;
  }
}

</style>
