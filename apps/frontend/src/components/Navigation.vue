<template>
  <nav class="navigation">
    <div class="nav-header">
      <div class="nav-logo">
        <span class="logo-icon">📊</span>
        <span class="logo-text">RotorWorks</span>
      </div>
    </div>
    
    <div class="nav-menu">
      <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Dashboard</span>
      </router-link>
      
      <router-link to="/analytics" class="nav-item" :class="{ active: $route.path === '/analytics' }">
        <span class="nav-icon">📈</span>
        <span class="nav-text">Analytics</span>
      </router-link>
      
      <router-link to="/reports" class="nav-item" :class="{ active: $route.path === '/reports' }">
        <span class="nav-icon">📋</span>
        <span class="nav-text">Reports</span>
      </router-link>
      
      <router-link to="/settings" class="nav-item" :class="{ active: $route.path === '/settings' }">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Settings</span>
      </router-link>
    </div>
    
    <div class="nav-footer">
      <div class="user-info">
        <div class="user-avatar">👤</div>
        <div class="user-details">
          <div class="user-name">Admin User</div>
          <div class="user-role">System Administrator</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Navigation component logic
</script>

<style scoped>
.navigation {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, var(--bg-color, #0f172a) 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.nav-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.nav-menu {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  margin: 4px 0;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border-left-color: rgba(102, 126, 234, 0.5);
}

.nav-item.active {
  background: rgba(102, 126, 234, 0.1);
  color: white;
  border-left-color: #667eea;
}

.nav-icon {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
  font-size: 0.875rem;
}

.nav-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.user-details {
  flex: 1;
}

.user-name {
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 2px;
}

.user-role {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .navigation {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .nav-menu {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 12px 0;
  }
  
  .nav-item {
    flex-shrink: 0;
    min-width: 80px;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
  }
  
  .nav-text {
    font-size: 0.75rem;
  }
}
</style>
