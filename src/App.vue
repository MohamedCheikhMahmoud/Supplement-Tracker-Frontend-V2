<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />

    <main class="page-wrapper">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 12%, rgba(168, 85, 247, 0.18), transparent 32%),
    radial-gradient(circle at 85% 10%, rgba(99, 102, 241, 0.1), transparent 28%), #0b1120;
}

.page-wrapper {
  min-height: calc(100vh - 82px);
  padding: 72px 32px;
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 40px 18px;
  }
}
</style>
