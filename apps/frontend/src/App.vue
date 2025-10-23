<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  line-height: 1.6;
}

.app {
  display: flex;
  min-height: 100vh;
  background: #0f172a;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 24px;
  background: #0f172a;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}
</style>