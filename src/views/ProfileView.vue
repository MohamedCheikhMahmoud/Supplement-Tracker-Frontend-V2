<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mail, Calendar, MapPin, Building2, Target, User, Shield } from 'lucide-vue-next'
import { updateUser } from '@/services/api'

const userId = Number(localStorage.getItem('userId'))

const username = ref(localStorage.getItem('username') || '')
const email = ref(localStorage.getItem('email') || '')
const age = ref(localStorage.getItem('age') ? Number(localStorage.getItem('age')) : null)
const address = ref(localStorage.getItem('address') || '')
const city = ref(localStorage.getItem('city') || '')
const fitnessGoal = ref(localStorage.getItem('fitnessGoal') || '')

const successMessage = ref('')
const errorMessage = ref('')

const initials = computed(() => {
  return username.value ? username.value.charAt(0).toUpperCase() : 'M'
})

async function saveProfile() {
  try {
    if (!userId) throw new Error('No user ID found. Please log in again.')

    const updatedUser = await updateUser(userId, {
      username: username.value,
      email: email.value,
      age: age.value,
      address: address.value,
      city: city.value,
      fitnessGoal: fitnessGoal.value,
    })

    localStorage.setItem('username', updatedUser.username)
    localStorage.setItem('email', updatedUser.email)
    localStorage.setItem('age', String(updatedUser.age ?? ''))
    localStorage.setItem('address', updatedUser.address ?? '')
    localStorage.setItem('city', updatedUser.city ?? '')
    localStorage.setItem('fitnessGoal', updatedUser.fitnessGoal ?? '')

    successMessage.value = 'Profile updated successfully.'
    errorMessage.value = ''

    setTimeout(() => {
      successMessage.value = ''
    }, 2500)
  } catch {
    errorMessage.value = 'Profile could not be saved.'
    successMessage.value = ''
  }
}
</script>

<template>
  <section class="profile-page">
    <div class="profile-header">
      <p class="label">USER PROFILE</p>
      <h1>Your Profile</h1>
      <p class="subtitle">Manage your personal information and fitness goals.</p>
    </div>

    <div class="profile-grid">
      <aside class="profile-summary glass-card">
        <div class="avatar">{{ initials }}</div>

        <h2>{{ username || 'User' }}</h2>
        <span class="badge">Member</span>

        <div class="quote">
          “Discipline today,<br />
          strength tomorrow.”
        </div>

        <div class="info-list">
          <div class="info-item">
            <span><Mail :size="20" /></span>
            <div>
              <small>Email</small>
              <p>{{ email || 'Not set' }}</p>
            </div>
          </div>

          <div class="info-item">
            <span><Calendar :size="20" /></span>
            <div>
              <small>Age</small>
              <p>{{ age || 'Not set' }}</p>
            </div>
          </div>

          <div class="info-item">
            <span><MapPin :size="20" /></span>
            <div>
              <small>Address</small>
              <p>{{ address || 'Not set' }}</p>
            </div>
          </div>

          <div class="info-item">
            <span><Building2 :size="20" /></span>
            <div>
              <small>City</small>
              <p>{{ city || 'Not set' }}</p>
            </div>
          </div>

          <div class="info-item">
            <span><Target :size="20" /></span>
            <div>
              <small>Fitness Goal</small>
              <p>{{ fitnessGoal || 'Not set' }}</p>
            </div>
          </div>
        </div>
      </aside>

      <div class="profile-form glass-card">
        <div class="form-title">
          <div class="icon-circle">
            <User :size="26" />
          </div>
          <div>
            <h2>Personal Information</h2>
            <p>Update your personal details below.</p>
          </div>
        </div>

        <form @submit.prevent="saveProfile">
          <label>
            Username
            <input v-model="username" type="text" placeholder="Username" />
          </label>

          <label>
            Email
            <input v-model="email" type="email" placeholder="Email" />
          </label>

          <div class="two-columns">
            <label>
              Age
              <input v-model="age" type="number" placeholder="Age" />
            </label>

            <label>
              City
              <input v-model="city" type="text" placeholder="City" />
            </label>
          </div>

          <label>
            Address
            <input v-model="address" type="text" placeholder="Address" />
          </label>

          <label>
            Fitness Goal
            <select v-model="fitnessGoal">
              <option value="">Select fitness goal</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Fat Loss">Fat Loss</option>
              <option value="Health">Health</option>
              <option value="Performance">Performance</option>
            </select>
          </label>

          <p v-if="successMessage" class="success">{{ successMessage }}</p>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>

    <div class="security-box glass-card">
      <div class="security-icon">
        <Shield :size="30" />
      </div>
      <div>
        <h3>Your data is safe with us</h3>
        <p>We never share your personal information with third parties.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-page {
  padding: 48px 24px;
}

.profile-header {
  max-width: 1120px;
  margin: 0 auto 32px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
}

.profile-header h1 {
  font-size: clamp(42px, 6vw, 64px);
  margin: 10px 0;
}

.subtitle {
  color: #cbd5e1;
  font-size: 18px;
}

.profile-grid {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
}

.profile-summary,
.profile-form,
.security-box {
  border: 1px solid rgba(168, 85, 247, 0.28);
  background:
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.18), transparent 35%),
    rgba(15, 23, 42, 0.78);
}

.profile-summary {
  padding: 32px;
  text-align: center;
}

.avatar {
  width: 132px;
  height: 132px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 52px;
  font-weight: 900;
  color: white;
  background: linear-gradient(135deg, #7c3aed, #c084fc);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.45);
  border: 3px solid rgba(255, 255, 255, 0.16);
}

.profile-summary h2 {
  font-size: 28px;
  margin: 8px 0;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  color: #d8b4fe;
  background: rgba(168, 85, 247, 0.18);
  font-weight: 800;
}

.quote {
  margin: 28px 0;
  padding: 20px;
  border-radius: 18px;
  color: #e9d5ff;
  border: 1px solid rgba(168, 85, 247, 0.35);
  background: rgba(88, 28, 135, 0.18);
  font-style: italic;
}

.info-list {
  display: grid;
  gap: 16px;
  text-align: left;
}

.info-item {
  display: flex;
  gap: 14px;
  align-items: center;
}

.info-item span {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #d8b4fe;
  background: rgba(168, 85, 247, 0.18);
}

.info-item small {
  color: #94a3b8;
}

.info-item p {
  margin: 2px 0 0;
  color: #f8fafc;
}

.profile-form {
  padding: 32px;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
}

.icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.35);
}

.form-title h2 {
  margin: 0;
  font-size: 26px;
}

.form-title p {
  margin: 4px 0 0;
  color: #cbd5e1;
}

form {
  display: grid;
  gap: 18px;
}

label {
  display: grid;
  gap: 8px;
  color: #f8fafc;
  font-weight: 700;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

input,
select {
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  color: #f8fafc;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
  outline: none;
}

input:focus,
select:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.14);
}

.success,
.error {
  padding: 14px;
  border-radius: 14px;
}

.success {
  color: #86efac;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.24);
}

.error {
  color: #fecaca;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.24);
}

button {
  justify-self: end;
  min-width: 180px;
}

.security-box {
  max-width: 1120px;
  margin: 28px auto 0;
  padding: 24px 30px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.security-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #d8b4fe;
  background: rgba(168, 85, 247, 0.18);
}

.security-box h3 {
  margin: 0 0 6px;
}

.security-box p {
  margin: 0;
  color: #cbd5e1;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .two-columns {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
