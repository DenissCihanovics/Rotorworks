<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1 class="dashboard-title">
        <span class="title-icon"></span>
        Project Dashboard
      </h1>
      <div class="dashboard-subtitle">Real-time project analytics and insights</div>
    </div>
    
    <!-- Filter Bar -->
    <FilterBar />
    
    <!-- KPI Cards -->
    <div class="kpi-grid">
      <KpiCard label="Total Projects" :value="kpis.totalProjects" />
      <KpiCard label="Active Tasks" :value="kpis.activeTasks" />
      <KpiCard label="Team Members" :value="kpis.teamMembers" />
      <KpiCard label="Completion Rate" :value="`${kpis.completionRate}%`" />
    </div>
    
    <!-- Charts Section -->
    <div class="charts-grid">
      <!-- Project Progress Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title"> Project Progress</h3>
          <div class="chart-subtitle">Over Time</div>
        </div>
        <LineChart 
          :x="chartData.progress.x" 
          :y="chartData.progress.y" 
        />
      </div>
      
      <!-- Team Performance Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">👥 Team Performance</h3>
          <div class="chart-subtitle">Monthly Trends</div>
        </div>
        <LineChart 
          :x="chartData.performance.x" 
          :y="chartData.performance.y" 
        />
      </div>
    </div>
    
    <!-- Tables Section -->
    <div class="tables-grid">
      <!-- Hours by Week Table -->
      <DataTable 
        title=" Hours by Week"
        :columns="weekColumns"
        :data="tableData.byWeek"
      />
      
      <!-- Hours by Task Table -->
      <DataTable 
        title="⚡ Hours by Task"
        :columns="taskColumns"
        :data="tableData.byTask"
      />
    </div>
    
    <!-- Employee and Project Tables -->
    <div class="tables-grid">
      <!-- Employee Summary Table -->
      <DataTable 
        title="👤 Employee Summary"
        :columns="employeeColumns"
        :data="tableData.byEmployee"
      />
      
      <!-- Project Summary Table -->
      <DataTable 
        title="🚀 Project Summary"
        :columns="projectColumns"
        :data="tableData.byProject"
      />
    </div>
    
    <!-- Recent Activity -->
    <div class="activity-card">
      <div class="activity-header">
        <h3 class="activity-title"> Recent Activity</h3>
        <div class="activity-subtitle">Latest updates and notifications</div>
      </div>
      <div class="activity-list">
        <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
          <div class="activity-indicator"></div>
          <div class="activity-content">
            <div class="activity-text">{{ activity.title }}</div>
            <div class="activity-time">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FilterBar from '@/components/FilterBar.vue'
import KpiCard from '@/components/KpiCard.vue'
import LineChart from '@/components/LineChart.vue'
import DataTable from '@/components/DataTable.vue'
import { getJSON } from '@/lib/api'

// KPI Data
const kpis = ref({
  totalProjects: 0,
  activeTasks: 0,
  teamMembers: 0,
  completionRate: 0
})

// Chart Data
const chartData = ref({
  progress: {
    x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    y: [20, 35, 45, 60, 75, 85]
  },
  performance: {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    y: [65, 72, 68, 75, 80, 85]
  }
})

// Table Data
const tableData = ref({
  byWeek: [] as Array<{ week: string; hours: number }>,
  byTask: [] as Array<{ task_name: string; hours: number }>,
  byEmployee: [] as Array<{ employee_name: string; employee_type_id: string; hours: number }>,
  byProject: [] as Array<{ project_name: string; hours: number; employees: number }>
})

// Table Columns
const weekColumns = [
  { key: 'week', label: 'Week' },
  { key: 'hours', label: 'Hours', format: 'number' as const }
]

const taskColumns = [
  { key: 'task_name', label: 'Task' },
  { key: 'hours', label: 'Hours', format: 'number' as const }
]

const employeeColumns = [
  { key: 'employee_name', label: 'Employee' },
  { key: 'employee_type_id', label: 'Type' },
  { key: 'hours', label: 'Hours', format: 'number' as const }
]

const projectColumns = [
  { key: 'project_name', label: 'Project' },
  { key: 'hours', label: 'Hours', format: 'number' as const },
  { key: 'employees', label: 'Employees' }
]

// Recent Activity
const recentActivity = ref([
  { id: 1, title: 'Project Alpha completed', time: '2 hours ago' },
  { id: 2, title: 'New task assigned to John Doe', time: '4 hours ago' },
  { id: 3, title: 'Team meeting scheduled', time: '6 hours ago' },
  { id: 4, title: 'Bug fix deployed', time: '1 day ago' },
  { id: 5, title: 'New team member onboarded', time: '2 days ago' }
])

// Load data on mount
onMounted(async () => {
  try {
    console.log('Loading dashboard data from API...')
    
    // Load table data from API
    const [hoursData, employeesData, projectsData] = await Promise.all([
      getJSON('/metrics/hours-summary'),
      getJSON('/metrics/employees-summary'),
      getJSON('/metrics/projects-summary')
    ])
    
    console.log('Dashboard data loaded:', { hoursData, employeesData, projectsData })
    
    // Calculate KPIs from the data
    kpis.value = {
      totalProjects: projectsData.projects?.length || 0,
      activeTasks: hoursData.by_task?.length || 0,
      teamMembers: employeesData.active_employees || 0,
      completionRate: Math.round((hoursData.total_hours || 0) / (employeesData.active_employees || 1) * 10) || 0
    }
    
    tableData.value = {
      byWeek: hoursData.by_week || [],
      byTask: hoursData.by_task || [],
      byEmployee: employeesData.by_week || [],
      byProject: projectsData.projects || []
    }
    
    // Update chart data with real data
    if (hoursData.by_week && hoursData.by_week.length > 0) {
      chartData.value.progress = {
        x: hoursData.by_week.map((w: any) => w.week),
        y: hoursData.by_week.map((w: any) => w.hours)
      }
    }
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    console.log('Using mock data for demo')
    // Use default values if API is not available
    kpis.value = {
      totalProjects: 12,
      activeTasks: 45,
      teamMembers: 8,
      completionRate: 78
    }
    
    tableData.value = {
      byWeek: [
        { week: '2023-W01', hours: 120.5 },
        { week: '2023-W02', hours: 135.2 },
        { week: '2023-W03', hours: 98.7 }
      ],
      byTask: [
        { task_name: 'Development', hours: 245.3 },
        { task_name: 'Testing', hours: 89.1 },
        { task_name: 'Documentation', hours: 45.2 }
      ],
      byEmployee: [
        { employee_name: 'John Doe', employee_type_id: 'RW', hours: 156.8 },
        { employee_name: 'Jane Smith', employee_type_id: 'Sub', hours: 98.4 },
        { employee_name: 'Mike Johnson', employee_type_id: 'Temp', hours: 67.2 }
      ],
      byProject: [
        { project_name: 'Project Alpha', hours: 234.5, employees: 3 },
        { project_name: 'Project Beta', hours: 189.2, employees: 2 },
        { project_name: 'Project Gamma', hours: 145.8, employees: 4 }
      ]
    }
  }
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 0;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 32px;
  color: white;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.title-icon {
  margin-right: 12px;
  font-size: 2.2rem;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.tables-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.activity-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.activity-header {
  margin-bottom: 20px;
}

.activity-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.activity-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateX(4px);
}

.activity-indicator {
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  margin-right: 16px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }
  
  .charts-grid,
  .tables-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-title {
    font-size: 2rem;
  }
}
</style>
