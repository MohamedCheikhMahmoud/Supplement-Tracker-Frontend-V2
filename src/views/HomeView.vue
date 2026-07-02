<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Activity,
  ArrowDown,
  CheckCircle,
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  Target,
} from '@lucide/vue'
</script>

<template>
  <section class="home-page">
    <div class="hero">
      <p class="label">MY SUPPS TRACKER</p>

      <h1>Manage your supplements.</h1>

      <p class="subtitle">Stay healthy. Stay organized. Stay consistent.</p>

      <RouterLink to="/supplements" class="primary-button cta"> Get Started </RouterLink>
    </div>

    <div class="section">
      <div class="section-header">
        <p class="label">WHY MYSUPPS?</p>
        <h2>Built for simple daily consistency.</h2>
      </div>

      <div class="feature-grid">
        <div class="feature-card glass-card">
          <ListChecks :size="34" />
          <h3>Track everything</h3>
          <p>Keep your supplements, dosage and intake time in one clean overview.</p>
        </div>

        <div class="feature-card glass-card">
          <CheckCircle :size="34" />
          <h3>Stay consistent</h3>
          <p>Mark supplements as taken and build a more structured routine.</p>
        </div>

        <div class="feature-card glass-card">
          <Target :size="34" />
          <h3>Simple Interface</h3>
          <p>Focus on your routine without unnecessary complexity.</p>
        </div>

        <div class="feature-card glass-card">
          <LayoutDashboard :size="34" />
          <h3>Modern Dashboard</h3>
          <p>See total, open and completed supplements in one place.</p>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <p class="label">HOW IT WORKS</p>
        <h2>Three steps to a better routine.</h2>
      </div>

      <div class="steps glass-card">
        <div class="step">
          <PlusCircle :size="32" />
          <span>1</span>
          <h3>Add Supplements</h3>
          <p>Create supplements with dosage, category and intake time.</p>
        </div>

        <ArrowDown class="step-arrow" :size="28" />

        <div class="step">
          <Activity :size="32" />
          <span>2</span>
          <h3>Track Intake</h3>
          <p>Mark supplements as taken or open during your day.</p>
        </div>

        <ArrowDown class="step-arrow" :size="28" />

        <div class="step">
          <CheckCircle :size="32" />
          <span>3</span>
          <h3>Build Consistency</h3>
          <p>Use the dashboard to keep an overview of your progress.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  max-width: 1250px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 80px 20px 90px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
  margin: 0;
}

h1 {
  font-size: clamp(52px, 8vw, 96px);
  margin: 16px 0;
  color: #f8fafc;
  letter-spacing: -3px;
}

.subtitle {
  color: #cbd5e1;
  font-size: 24px;
  margin-bottom: 36px;
}

.cta {
  display: inline-block;
}

.section {
  margin-bottom: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 42px;
  margin: 14px 0 0;
  color: #f8fafc;
  letter-spacing: -1px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.feature-card {
  padding: 30px;
  text-align: center;
}

.feature-card svg,
.step svg {
  color: #a855f7;
}

.feature-card h3,
.step h3 {
  color: #f8fafc;
  margin: 18px 0 10px;
}

.feature-card p,
.step p {
  color: #cbd5e1;
  line-height: 1.6;
}

.steps {
  padding: 34px;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 24px;
  align-items: center;
}

.step {
  text-align: center;
}

.step span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: 16px auto 0;
  border-radius: 999px;
  background: rgba(168, 85, 247, 0.16);
  color: #c084fc;
  font-weight: 900;
  border: 1px solid rgba(168, 85, 247, 0.28);
}

.step-arrow {
  color: #a855f7;
  opacity: 0.7;
}

@media (max-width: 1000px) {
  .feature-grid {
    grid-template-columns: 1fr 1fr;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .step-arrow {
    transform: rotate(0deg);
    margin: 0 auto;
  }
}

@media (max-width: 650px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
