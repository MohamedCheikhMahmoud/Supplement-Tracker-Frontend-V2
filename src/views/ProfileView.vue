<script setup lang="ts">
import { ref } from 'vue'

const username = ref(localStorage.getItem('username') || '')
const email = ref(localStorage.getItem('email') || '')
const age = ref(localStorage.getItem('age') || '')
const address = ref(localStorage.getItem('address') || '')
const city = ref(localStorage.getItem('city') || '')
const fitnessGoal = ref(localStorage.getItem('fitnessGoal') || '')
const successMessage = ref('')

function saveProfile() {
  localStorage.setItem('username', username.value)
  localStorage.setItem('email', email.value)
  localStorage.setItem('age', age.value)
  localStorage.setItem('address', address.value)
  localStorage.setItem('city', city.value)
  localStorage.setItem('fitnessGoal', fitnessGoal.value)

  successMessage.value = 'Profile updated successfully.'

  window.setTimeout(() => {
    successMessage.value = ''
  }, 2500)
}
</script>

<template>
  <section class="profile-page">
    <div class="profile-card glass-card">
      <p class="label">USER PROFILE</p>
      <h1>Edit Profile</h1>

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

        <button type="submit">Save Profile</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.profile-page {
  min-height: 70vh;
  display: grid;
  place-items: center;
}

.profile-card {
  width: min(620px, 100%);
  padding: 38px;
}

.label {
  color: #a855f7;
  font-weight: 900;
  letter-spacing: 3px;
}

h1 {
  font-size: 44px;
  margin: 10px 0 28px;
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
</style>
