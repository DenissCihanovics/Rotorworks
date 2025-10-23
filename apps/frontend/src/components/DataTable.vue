<template>
  <div class="data-table">
    <div class="table-header">
      <h3 class="table-title">{{ title }}</h3>
    </div>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="table-header-row">
            <th v-for="column in columns" :key="column.key" class="table-header-cell">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index" class="table-row">
            <td v-for="column in columns" :key="column.key" class="table-cell">
              <span v-if="column.format === 'number'">{{ formatNumber(row[column.key]) }}</span>
              <span v-else-if="column.format === 'percentage'">{{ row[column.key] }}%</span>
              <span v-else>{{ row[column.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="data.length === 0" class="empty-state">
      <div class="empty-icon">📊</div>
      <div class="empty-text">No data available</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  format?: 'number' | 'percentage' | 'text'
}

defineProps<{
  title: string
  columns: Column[]
  data: any[]
}>()

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 1, 
    maximumFractionDigits: 1 
  }).format(value)
}
</script>

<style scoped>
.data-table {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.data-table:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.table-header {
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.table-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-header-row {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.table-header-cell {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.table-row {
  border-bottom: 1px solid rgba(243, 244, 246, 0.8);
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.table-cell {
  padding: 16px 20px;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.empty-state {
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 12px;
  opacity: 0.6;
}

.empty-text {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
