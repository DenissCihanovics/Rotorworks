import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import Analytics from '@/pages/Analytics.vue'
import Reports from '@/pages/Reports.vue'
import Settings from '@/pages/Settings.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/analytics', component: Analytics },
    { path: '/reports', component: Reports },
    { path: '/settings', component: Settings }
  ]
})