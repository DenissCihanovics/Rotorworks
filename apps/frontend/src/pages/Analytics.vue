<template>
  <div class="analytics">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📈</span>
        Advanced Analytics
      </h1>
      <div class="page-subtitle">Deep insights and performance metrics</div>
    </div>
    
    <!-- Advanced Charts Section -->
    <div class="charts-section">
      <div class="chart-grid">
        <!-- Performance Trends -->
        <div class="chart-card large">
          <div class="chart-header">
            <h3 class="chart-title">📊 Performance Trends</h3>
            <div class="chart-subtitle">Monthly performance comparison</div>
          </div>
          <LineChart 
            :x="analyticsData.performance.x" 
            :y="analyticsData.performance.y" 
          />
        </div>
        
        <!-- Department Comparison -->
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">🏢 Department Analysis</h3>
            <div class="chart-subtitle">Hours by department</div>
          </div>
          <LineChart 
            :x="analyticsData.departments.x" 
            :y="analyticsData.departments.y" 
          />
        </div>
        
        <!-- Employee Productivity -->
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">👥 Employee Productivity</h3>
            <div class="chart-subtitle">Individual performance metrics</div>
          </div>
          <LineChart 
            :x="analyticsData.employees.x" 
            :y="analyticsData.employees.y" 
          />
        </div>
      </div>
    </div>
    
    <!-- Detailed Tables -->
    <div class="tables-section">
      <div class="section-header">
        <h2 class="section-title">📋 Detailed Analysis</h2>
        <div class="section-subtitle">Comprehensive data breakdown</div>
      </div>
      
      <div class="tables-grid">
        <DataTable 
          title="📅 Weekly Performance"
          :columns="weeklyColumns"
          :data="analyticsData.weeklyData"
        />
        
        <DataTable 
          title="⚡ Task Efficiency"
          :columns="taskColumns"
          :data="analyticsData.taskData"
        />
      </div>
    </div>
    
    <!-- Insights Section -->
    <div class="insights-section">
      <div class="insights-card">
        <div class="insights-header">
          <h3 class="insights-title">💡 Key Insights</h3>
          <div class="insights-subtitle">AI-powered recommendations</div>
        </div>
        <div class="insights-list">
          <div v-for="insight in insights" :key="insight.id" class="insight-item">
            <div class="insight-icon">{{ insight.icon }}</div>
            <div class="insight-content">
              <div class="insight-title">{{ insight.title }}</div>
              <div class="insight-description">{{ insight.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LineChart from '@/components/LineChart.vue'
import DataTable from '@/components/DataTable.vue'
import { getJSON } from '@/lib/api'

// Analytics Data
const analyticsData = ref({
  performance: {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    y: [85, 92, 78, 95, 88, 91]
  },
  departments: {
    x: ['Engineering', 'Design', 'Marketing', 'Sales'],
    y: [120, 85, 65, 95]
  },
  employees: {
    x: ['John', 'Sarah', 'Mike', 'Lisa', 'Tom'],
    y: [95, 88, 92, 85, 90]
  },
  weeklyData: [],
  taskData: []
})

// Table Columns
const weeklyColumns = [
  { key: 'week', label: 'Week' },
  { key: 'hours', label: 'Hours', format: 'number' as const },
  { key: 'efficiency', label: 'Efficiency %', format: 'percentage' as const }
]

const taskColumns = [
  { key: 'task', label: 'Task' },
  { key: 'hours', label: 'Hours', format: 'number' as const },
  { key: 'completion', label: 'Completion %', format: 'percentage' as const }
]

// Insights
const insights = ref([
  {
    id: 1,
    icon: '🚀',
    title: 'Performance Boost Opportunity',
    description: 'Engineering team shows 15% higher efficiency on Tuesdays. Consider scheduling complex tasks on this day.'
  },
  {
    id: 2,
    icon: '⚠️',
    title: 'Resource Allocation Alert',
    description: 'Marketing department is underutilized by 20%. Consider redistributing workload or new projects.'
  },
  {
    id: 3,
    icon: '💡',
    title: 'Optimization Suggestion',
    description: 'Task switching reduces efficiency by 12%. Implement focused work blocks for better productivity.'
  }
])

// Load data on mount
onMounted(async () => {
  try {
    // Load analytics data from API
    const data = await getJSON('/analytics')
    analyticsData.value = data
  } catch (error) {
    console.log('Using mock data for analytics')
    // Use mock data
    analyticsData.value.weeklyData = [
      { week: '2023-W01', hours: 120.5, efficiency: 85 },
      { week: '2023-W02', hours: 135.2, efficiency: 92 },
      { week: '2023-W03', hours: 98.7, efficiency: 78 }
    ]
    analyticsData.value.taskData = [
      { task: 'Development', hours: 245.3, completion: 85 },
      { task: 'Testing', hours: 89.1, completion: 92 },
      { task: 'Documentation', hours: 45.2, completion: 78 }
    ]
  }
})
</script>

<style scoped>
.analytics {
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

.charts-section {
  margin-bottom: 40px;
}

.chart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-card.large {
  grid-column: 1;
  grid-row: 1 / 3;
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.chart-header {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.chart-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.tables-section {
  margin-bottom: 40px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: white;
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.tables-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.insights-section {
  margin-bottom: 40px;
}

.insights-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.insights-header {
  margin-bottom: 24px;
}

.insights-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.insights-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s ease;
}

.insight-item:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateX(4px);
}

.insight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.insight-content {
  flex: 1;
}

.insight-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  font-size: 1rem;
}

.insight-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .chart-card.large {
    grid-column: 1;
    grid-row: 1;
  }
  
  .tables-grid {
    grid-template-columns: 1fr;
  }
}
</style>
