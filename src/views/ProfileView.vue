<script setup lang="ts">
import { ref } from 'vue'
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

async function saveProfile() {
  try {
    if (!userId) {
      throw new Error('No user id found. Please login again.')
    }

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
    localStorage.setItem('age', String(updatedUser.age || ''))
    localStorage.setItem('address', updatedUser.address || '')
    localStorage.setItem('city', updatedUser.city || '')
    localStorage.setItem('fitnessGoal', updatedUser.fitnessGoal || '')

    successMessage.value = 'Profile updated successfully.'
    errorMessage.value = ''

    window.setTimeout(() => {
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
    <div class="profile-card glass-card">
      <p class="label">USER PROFILE</p>
      <h1>Edit Profile</h1>
      <p class="subtitle">Update your personal information and fitness goal.</p>

      <form @submit.prevent="saveProfile">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="age" type="number" placeholder="Age" />
        <input v-model="address" type="text" placeholder="Address" />
        <input v-model="city" type="text" placeholder="City" />

        <select v-model="fitnessGoal">
          <option value="">Select fitness goal</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Fat Loss">Fat Loss</option>
          <option value="Health">Health</option>
          <option value="Performance">Performance</option>
        </select>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.profile-page {
  min-height: 75vh;
  display: grid;
  place-items: center;
  padding: 40px 20px;
}

.profile-card {
  width: min(680px, 100%);
  padding: 42px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
}

h1 {
  font-size: 44px;
  margin: 10px 0 10px;
}

.subtitle {
  color: #cbd5e1;
  margin-bottom: 28px;
}

form {
  display: grid;
  gap: 16px;
}

.success {
  color: #86efac;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.24);
  padding: 12px;
  border-radius: 12px;
}

.error {
  color: #fecaca;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.24);
  padding: 12px;
  border-radius: 12px;
}
</style>
