<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { loginUser } from '@/services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

function validateForm() {
  if (!email.value.includes('@')) return 'Please enter a valid email address.'
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  return ''
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

    localStorage.setItem('username', user.username)
    localStorage.setItem('email', user.email)

    await router.push('/dashboard')
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

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />

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
</style>
