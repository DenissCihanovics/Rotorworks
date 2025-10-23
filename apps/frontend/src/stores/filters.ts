import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    department_id: '',
    year: '',
    week: '',
    task_id: '',
    employee_type_id: '',
    project_id: '',
    employee_id: ''
  }),
  actions: {
    toQueryString() {
      const q = Object.entries(this.$state).filter(([,v]) => v)
      return new URLSearchParams(q as any).toString()
    }
  }
})