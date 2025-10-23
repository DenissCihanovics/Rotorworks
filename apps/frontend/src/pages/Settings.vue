<template>
  <div class="settings">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">⚙️</span>
        Settings & Configuration
      </h1>
      <div class="page-subtitle">Manage your application preferences and system settings</div>
    </div>
    
    <!-- Settings Sections -->
    <div class="settings-sections">
      <!-- General Settings -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">🔧 General Settings</h3>
          <div class="card-subtitle">Basic application preferences</div>
        </div>
        <div class="settings-content">
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Application Theme</label>
              <div class="setting-description">Choose your preferred color scheme</div>
            </div>
            <select class="setting-control" v-model="settings.theme">
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Language</label>
              <div class="setting-description">Select your preferred language</div>
            </div>
            <select class="setting-control" v-model="settings.language">
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Time Zone</label>
              <div class="setting-description">Set your local time zone</div>
            </div>
            <select class="setting-control" v-model="settings.timezone">
              <option value="UTC">UTC</option>
              <option value="CET">Central European Time</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Notification Settings -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">🔔 Notifications</h3>
          <div class="card-subtitle">Configure your notification preferences</div>
        </div>
        <div class="settings-content">
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Email Notifications</label>
              <div class="setting-description">Receive updates via email</div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="settings.emailNotifications">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Push Notifications</label>
              <div class="setting-description">Browser push notifications</div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="settings.pushNotifications">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Weekly Reports</label>
              <div class="setting-description">Automatic weekly summary emails</div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="settings.weeklyReports">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Data & Privacy -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">🔒 Data & Privacy</h3>
          <div class="card-subtitle">Manage your data and privacy settings</div>
        </div>
        <div class="settings-content">
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Data Retention</label>
              <div class="setting-description">How long to keep your data</div>
            </div>
            <select class="setting-control" v-model="settings.dataRetention">
              <option value="1year">1 Year</option>
              <option value="2years">2 Years</option>
              <option value="5years">5 Years</option>
              <option value="forever">Forever</option>
            </select>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <label class="setting-label">Analytics Tracking</label>
              <div class="setting-description">Help improve the application</div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="settings.analytics">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
        <div class="setting-actions">
          <button class="btn-danger" @click="exportData" :disabled="exporting">
            {{ exporting ? '⏳ Exporting...' : '📤 Export My Data' }}
          </button>
          <button class="btn-danger" @click="deleteAccount" :disabled="deleting">
            {{ deleting ? '⏳ Deleting...' : '🗑️ Delete Account' }}
          </button>
        </div>
        </div>
      </div>
      
      <!-- System Information -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">ℹ️ System Information</h3>
          <div class="card-subtitle">Application and system details</div>
        </div>
        <div class="settings-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Application Version</div>
              <div class="info-value">{{ systemInfo.application.version || 'v1.0.0' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Last Updated</div>
              <div class="info-value">{{ systemInfo.application.lastUpdated || '2023-10-20' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Database Size</div>
              <div class="info-value">{{ systemInfo.database.size || '2.4 GB' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Active Users</div>
              <div class="info-value">{{ systemInfo.users.active || '1,247' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Save Button -->
    <div class="save-section">
      <button class="btn-save" @click="saveSettings" :disabled="saving">
        {{ saving ? '⏳ Saving...' : '💾 Save Settings' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Settings state
const settings = ref({
  theme: 'dark',
  language: 'en',
  timezone: 'CET',
  emailNotifications: true,
  pushNotifications: false,
  weeklyReports: true,
  dataRetention: '2years',
  analytics: true
})

// System info
const systemInfo = ref({
  application: { name: '', version: '', lastUpdated: '' },
  database: { type: '', size: '', lastBackup: '' },
  server: { nodeVersion: '', platform: '', uptime: 0 },
  users: { total: 0, active: 0, online: 0 }
})

// Loading states
const saving = ref(false)
const exporting = ref(false)
const deleting = ref(false)

// Load settings on mount
onMounted(async () => {
  await loadSettings()
  await loadSystemInfo()
})

// Load user settings
const loadSettings = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings`)
    const data = await response.json()
    if (data.success) {
      settings.value = { ...settings.value, ...data.settings }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

// Load system information
const loadSystemInfo = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings/system-info`)
    const data = await response.json()
    systemInfo.value = data
  } catch (error) {
    console.error('Error loading system info:', error)
  }
}

// Save settings
const saveSettings = async () => {
  saving.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings.value)
    })
    
    const data = await response.json()
    if (data.success) {
      // Сохраняем в localStorage для немедленного применения
      localStorage.setItem('userSettings', JSON.stringify(settings.value))
      
      // Применяем тему
      applyTheme(settings.value.theme)
      
      alert('Settings saved successfully!')
    } else {
      alert('Failed to save settings')
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error saving settings')
  } finally {
    saving.value = false
  }
}

// Apply theme
const applyTheme = (theme: string) => {
  const root = document.documentElement
  if (theme === 'dark') {
    root.style.setProperty('--bg-color', '#0f172a')
    root.style.setProperty('--text-color', '#e2e8f0')
  } else if (theme === 'light') {
    root.style.setProperty('--bg-color', '#ffffff')
    root.style.setProperty('--text-color', '#1f2937')
  } else {
    // Auto - follow system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }
}

// Export data
const exportData = async () => {
  exporting.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings/export-data`, {
      method: 'POST'
    })
    
    const data = await response.json()
    if (data.success) {
      // Скачиваем файл
      const downloadResponse = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings/download-export`)
      const downloadData = await downloadResponse.json()
      
      if (downloadData.success) {
        const blob = new Blob([JSON.stringify(downloadData.data, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = downloadData.filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        alert('Data exported successfully!')
      }
    } else {
      alert('Failed to export data')
    }
  } catch (error) {
    console.error('Error exporting data:', error)
    alert('Error exporting data')
  } finally {
    exporting.value = false
  }
}

// Delete account
const deleteAccount = async () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    deleting.value = true
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/settings/delete-account`, {
        method: 'POST'
      })
      
      const data = await response.json()
      if (data.success) {
        alert(`Account deletion request submitted. Your account will be deleted on ${new Date(data.deletionDate).toLocaleDateString()}`)
      } else {
        alert('Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Error deleting account')
    } finally {
      deleting.value = false
    }
  }
}
</script>

<style scoped>
.settings {
  min-height: 100vh;
  padding: 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.title-icon {
  margin-right: 12px;
  font-size: 2.2rem;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.settings-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  margin-bottom: 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-label {
  display: block;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.setting-description {
  font-size: 0.875rem;
  color: #6b7280;
}

.setting-control {
  padding: 8px 12px;
  border: 1px solid rgba(209, 213, 219, 0.8);
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  color: #1f2937;
  min-width: 120px;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #667eea;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.setting-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn-danger {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #ef4444;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-danger:hover {
  background: #ef4444;
  color: white;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-item {
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.info-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.info-value {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.save-section {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.btn-save {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .setting-control {
    width: 100%;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
