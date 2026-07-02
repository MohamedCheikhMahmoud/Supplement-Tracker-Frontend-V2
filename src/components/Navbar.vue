<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = computed(() => localStorage.getItem('username'))
const isLoggedIn = computed(() => !!username.value)

async function logout() {
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  await router.push('/login')
}
</script>

<template>
  <header class="navbar-wrapper">
    <nav class="navbar">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">M</span>
        <span>MySupps</span>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/dashboard">Dashboard</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/supplements">Supplements</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login" class="login-link">Login</RouterLink>

        <button v-if="isLoggedIn" class="logout-button" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 17, 32, 0.84);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.navbar {
  height: 82px;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a855f7;
  font-size: 30px;
  font-weight: 900;
}

.logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 13px;
  background: linear-gradient(135deg, #7e22ce, #a855f7);
  color: white;
  display: grid;
  place-items: center;
  font-size: 18px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-links a,
.logout-button {
  position: relative;
  color: #e5e7eb;
  font-size: 16px;
  font-weight: 750;
  transition: all 0.25s ease;
}

.nav-links a:hover,
.logout-button:hover {
  color: #c084fc;
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  color: #a855f7;
}

.login-link,
.logout-button {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.28);
}

.logout-button {
  cursor: pointer;
}

@media (max-width: 900px) {
  .navbar {
    padding: 0 22px;
  }

  .nav-links {
    gap: 14px;
  }
}
</style>
