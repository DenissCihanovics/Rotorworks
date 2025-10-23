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

:root {
  --bg-color: #0f172a;
  --text-color: #e2e8f0;
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-text: #1f2937;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  display: flex;
  min-height: 100vh;
  background: var(--bg-color);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 24px;
  background: var(--bg-color);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}
</style>