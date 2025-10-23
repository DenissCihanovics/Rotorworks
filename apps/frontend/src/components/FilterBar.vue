<template>
  <div class="filter-bar">
    <div class="filter-header">
      <h3 class="filter-title">🔍 Filters</h3>
      <div class="filter-subtitle">Customize your data view</div>
    </div>
    <div class="filter-controls">
      <div class="filter-group">
        <label class="filter-label">Department</label>
        <select v-model="f.department_id" class="filter-select">
          <option value="">All Departments</option>
          <option v-for="d in deps" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Year</label>
        <select v-model="f.year" class="filter-select">
          <option value="">All Years</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Week</label>
        <select v-model="f.week" class="filter-select">
          <option value="">All Weeks</option>
          <option v-for="w in weeks" :key="w" :value="w">{{ w }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { getJSON } from '@/lib/api'
  import { useFiltersStore } from '@/stores/filters'
  const f = useFiltersStore()
  const deps = ref<any[]>([])
  const years = ref<number[]>([])
  const weeks = ref<number[]>([])
  onMounted(async () => {
    deps.value = await getJSON('/filters/departments')
    years.value = await getJSON('/filters/years')
    weeks.value = await getJSON('/filters/weeks')
  })
</script>

<style scoped>
.filter-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 32px;
}

.filter-header {
  margin-bottom: 20px;
}

.filter-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.filter-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.filter-controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.filter-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(209, 213, 219, 0.8);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  color: #1f2937;
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-select:hover {
  border-color: #9ca3af;
}

@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
  }
  
  .filter-group {
    min-width: unset;
  }
}
</style>