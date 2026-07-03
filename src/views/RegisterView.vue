<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { registerUser } from '@/services/api'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

function validateForm() {
  if (username.value.trim().length < 2) return 'Username must contain at least 2 characters.'
  if (!email.value.includes('@')) return 'Please enter a valid email address.'
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  if (password.value !== confirmPassword.value) return 'Passwords do not match.'
  return ''
}

async function handleRegister() {
  errorMessage.value = ''

  const validationError = validateForm()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  loading.value = true

  try {
    const user = await registerUser({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('userId', String(user.id))
    localStorage.setItem('username', user.username)
    localStorage.setItem('email', user.email)
    localStorage.setItem('age', String(user.age || ''))
    localStorage.setItem('address', user.address || '')
    localStorage.setItem('city', user.city || '')
    localStorage.setItem('fitnessGoal', user.fitnessGoal || '')

    await router.push('/dashboard')
  } catch {
    errorMessage.value = 'Registration failed. Please try another email.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card glass-card">
      <p class="label">CREATE ACCOUNT</p>
      <h1>Register</h1>

      <form @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm password" />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <p class="switch-text">
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  min-height: 70vh;
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(460px, 100%);
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

.error {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.24);
  padding: 12px;
  border-radius: 12px;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.switch-text {
  margin-top: 22px;
  color: #cbd5e1;
  text-align: center;
}

.switch-text a {
  color: #a855f7;
  font-weight: 800;
}

@media (max-width: 768px) {
  .auth-page {
    padding: 0 16px;
  }

  .auth-card {
    width: 100%;
    max-width: 460px;
    padding: 28px;
  }

  h1 {
    font-size: 38px;
  }
}
</style>
