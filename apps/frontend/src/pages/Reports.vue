<template>
  <div class="reports">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-icon">📋</span>
        Reports & Documents
      </h1>
      <div class="page-subtitle">Generate and download comprehensive reports</div>
    </div>
    
    <!-- Report Types -->
    <div class="reports-grid">
      <div class="report-card" v-for="report in reportTypes" :key="report.id">
        <div class="report-icon">{{ report.icon }}</div>
        <div class="report-content">
          <h3 class="report-title">{{ report.title }}</h3>
          <p class="report-description">{{ report.description }}</p>
          <div class="report-actions">
            <button class="btn-primary" @click="generateReport(report.id)">
              Generate Report
            </button>
            <button class="btn-secondary" @click="previewReport(report.id)">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Reports -->
    <div class="recent-reports">
      <div class="section-header">
        <h2 class="section-title">📄 Recent Reports</h2>
        <div class="section-subtitle">Your latest generated documents</div>
      </div>
      
      <div class="reports-list">
        <div v-for="report in recentReports" :key="report.id" class="report-item">
          <div class="report-info">
            <div class="report-name">{{ report.name }}</div>
            <div class="report-meta">
              <span class="report-date">{{ report.date }}</span>
              <span class="report-size">{{ report.size }}</span>
            </div>
          </div>
          <div class="report-actions">
            <button class="btn-icon" @click="downloadReport(report.id)">
              ⬇️
            </button>
            <button class="btn-icon" @click="shareReport(report.id)">
              🔗
            </button>
            <button class="btn-icon" @click="deleteReport(report.id)">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Report Templates -->
    <div class="templates-section">
      <div class="section-header">
        <h2 class="section-title">📝 Report Templates</h2>
        <div class="section-subtitle">Pre-configured report formats</div>
      </div>
      
      <div class="templates-grid">
        <div v-for="template in templates" :key="template.id" class="template-card">
          <div class="template-header">
            <div class="template-icon">{{ template.icon }}</div>
            <div class="template-info">
              <h4 class="template-title">{{ template.title }}</h4>
              <p class="template-description">{{ template.description }}</p>
            </div>
          </div>
          <div class="template-actions">
            <button class="btn-outline" @click="useTemplate(template.id)">
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Report Types
const reportTypes = ref([
  {
    id: 'weekly',
    icon: '📅',
    title: 'Weekly Summary',
    description: 'Comprehensive weekly performance and hours report'
  },
  {
    id: 'monthly',
    icon: '📊',
    title: 'Monthly Analytics',
    description: 'Detailed monthly analysis with trends and insights'
  },
  {
    id: 'department',
    icon: '🏢',
    title: 'Department Report',
    description: 'Department-specific performance and resource allocation'
  },
  {
    id: 'employee',
    icon: '👤',
    title: 'Employee Performance',
    description: 'Individual employee productivity and time tracking'
  },
  {
    id: 'project',
    icon: '🚀',
    title: 'Project Status',
    description: 'Current project progress and milestone tracking'
  },
  {
    id: 'financial',
    icon: '💰',
    title: 'Financial Summary',
    description: 'Cost analysis and budget tracking reports'
  }
])

// Recent Reports
const recentReports = ref([
  {
    id: 1,
    name: 'Weekly Report - Week 42',
    date: '2023-10-20',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Department Analysis - Engineering',
    date: '2023-10-18',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Monthly Summary - September',
    date: '2023-10-15',
    size: '3.2 MB'
  }
])

// Templates
const templates = ref([
  {
    id: 1,
    icon: '📈',
    title: 'Executive Summary',
    description: 'High-level overview for management'
  },
  {
    id: 2,
    icon: '📋',
    title: 'Detailed Analysis',
    description: 'Comprehensive data breakdown'
  },
  {
    id: 3,
    icon: '📊',
    title: 'Visual Dashboard',
    description: 'Chart-heavy presentation format'
  }
])

// Methods
const generateReport = async (reportId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/reports/${reportId}`)
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportId}-report.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } else {
      alert('Failed to generate report')
    }
  } catch (error) {
    console.error('Error generating report:', error)
    alert('Error generating report')
  }
}

const previewReport = async (reportId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3006'}/reports/${reportId}/preview`)
    const data = await response.json()
    if (data.success) {
      alert(`Report preview generated successfully!\nSize: ${data.size} bytes\nType: ${data.type}`)
    } else {
      alert('Failed to generate report preview')
    }
  } catch (error) {
    console.error('Error previewing report:', error)
    alert('Error previewing report')
  }
}

const downloadReport = (reportId: number) => {
  console.log('Downloading report:', reportId)
  // Implement download logic
}

const shareReport = (reportId: number) => {
  console.log('Sharing report:', reportId)
  // Implement sharing logic
}

const deleteReport = (reportId: number) => {
  console.log('Deleting report:', reportId)
  // Implement deletion logic
}

const useTemplate = (templateId: number) => {
  console.log('Using template:', templateId)
  // Implement template usage logic
}
</script>

<style scoped>
.reports {
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

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.report-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.report-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.report-content {
  flex: 1;
}

.report-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.report-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 16px;
  line-height: 1.5;
}

.report-actions {
  display: flex;
  gap: 8px;
}

.btn-primary, .btn-secondary, .btn-outline {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.btn-secondary:hover {
  background: rgba(102, 126, 234, 0.2);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}

.btn-outline:hover {
  background: rgba(102, 126, 234, 0.1);
}

.recent-reports, .templates-section {
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

.reports-list {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.report-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.report-item:last-child {
  border-bottom: none;
}

.report-info {
  flex: 1;
}

.report-name {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.report-meta {
  display: flex;
  gap: 16px;
  font-size: 0.875rem;
  color: #6b7280;
}

.report-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: rgba(102, 126, 234, 0.2);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.template-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.template-header {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.template-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.template-info {
  flex: 1;
}

.template-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.template-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

.template-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }
  
  .report-card {
    flex-direction: column;
    text-align: center;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
