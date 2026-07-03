<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { loginUser } from '@/services/api'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

function validateForm() {
  if (!email.value.includes('@')) return 'Please enter a valid email address.'
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  return ''
}

function showForgotPassword() {
  alert(
    'Password reset is not available in this demo version.\n\nPlease contact the administrator or create a new account.',
  )
}

async function handleLogin() {
  errorMessage.value = ''

  const validationError = validateForm()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  loading.value = true

  try {
    const user = await loginUser(email.value, password.value)

    localStorage.setItem('userId', String(user.id ?? 'logged-in'))
    localStorage.setItem('username', user.username || email.value)
    localStorage.setItem('email', user.email || email.value)
    localStorage.setItem('age', String(user.age || ''))
    localStorage.setItem('address', user.address || '')
    localStorage.setItem('city', user.city || '')
    localStorage.setItem('fitnessGoal', user.fitnessGoal || '')

    window.location.href = '/dashboard'
  } catch {
    errorMessage.value = 'Wrong email or password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card glass-card">
      <p class="label">WELCOME BACK</p>
      <h1>Sign in</h1>
      <p class="subtitle">Sign in to manage your supplements and track your daily progress.</p>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />

        <div class="forgot-password">
          <a href="#" @click.prevent="showForgotPassword"> Forgot your password? </a>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="switch-text">
        No account yet?
        <RouterLink to="/register">Create one</RouterLink>
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
  margin: 10px 0 8px;
}

.subtitle {
  color: #cbd5e1;
  margin-bottom: 26px;
  line-height: 1.5;
}

form {
  display: grid;
  gap: 16px;
}

.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;
  margin-bottom: -2px;
}

.forgot-password a {
  color: #a855f7;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: 0.2s;
}

.forgot-password a:hover {
  color: #c084fc;
  text-decoration: underline;
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
