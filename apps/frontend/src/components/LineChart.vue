<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'

const props = defineProps<{ 
  x: (string|number)[]; 
  y: number[]; 
  title?: string 
}>()

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let resizeHandler: (() => void) | null = null

const initChart = async () => {
  if (!chartContainer.value) return
  
  // Уничтожаем предыдущий экземпляр если есть
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  
  await nextTick()
  
  try {
    chartInstance = echarts.init(chartContainer.value)
    updateChart()
    
    // Добавляем обработчик resize
    resizeHandler = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    }
    window.addEventListener('resize', resizeHandler)
  } catch (error) {
    console.warn('ECharts initialization failed:', error)
  }
}

const updateChart = () => {
  if (!chartInstance || !props.x || !props.y) return
  
  const option = {
    title: props.title ? { 
      text: props.title, 
      left: 'center',
      textStyle: { color: '#e2e8f0' }
    } : undefined,
    tooltip: { 
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: { 
      type: 'category', 
      data: props.x,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9ca3af' }
    },
    yAxis: { 
      type: 'value',
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9ca3af' }
    },
    series: [{ 
      type: 'line', 
      data: props.y, 
      smooth: true,
      lineStyle: { color: '#6366f1' },
      itemStyle: { color: '#6366f1' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
            { offset: 1, color: 'rgba(99, 102, 241, 0.05)' }
          ]
        }
      }
    }]
  }
  
  chartInstance.setOption(option, true)
}

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
})

// Следим за изменениями props
watch(() => [props.x, props.y, props.title], () => {
  if (chartInstance) {
    updateChart()
  } else {
    initChart()
  }
}, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 320px;
  min-height: 320px;
}
</style>