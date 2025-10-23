import { Injectable } from '@nestjs/common'
import { ENTRIES, applyFilters } from '../common/utils/mock-data'


@Injectable()
export class MetricsService {
hoursSummary(q: any) {
const rows = applyFilters(ENTRIES, q)
const total_hours = rows.reduce((s, r) => s + r.hours, 0)
const by_week = Object.values(rows.reduce((acc: any, r) => {
acc[r.week_iso] ??= { week: r.week_iso, hours: 0 }
acc[r.week_iso].hours += r.hours
return acc
}, {}))
const by_task = Object.values(rows.reduce((acc: any, r) => {
acc[r.task_id] ??= { task_id: r.task_id, task_name: r.task_name, hours: 0 }
acc[r.task_id].hours += r.hours
return acc
}, {}))
const by_employee_type = Object.values(rows.reduce((acc: any, r) => {
acc[r.employee_type_id] ??= { employee_type_id: r.employee_type_id, hours: 0 }
acc[r.employee_type_id].hours += r.hours
return acc
}, {}))
const by_project = Object.values(rows.reduce((acc: any, r) => {
acc[r.project_id] ??= { project_id: r.project_id, project_name: r.project_name, hours: 0 }
acc[r.project_id].hours += r.hours
return acc
}, {}))
return { total_hours, by_week, by_task, by_employee_type, by_project }
}


employeesSummary(q: any) {
const rows = applyFilters(ENTRIES, q)
const employeesSet = new Set(rows.map(r => r.employee_id))
const active_employees = employeesSet.size
const total_hours = rows.reduce((s, r) => s + r.hours, 0)
const avg_hours_per_employee = active_employees ? total_hours / active_employees : 0
const by_week = Object.values(rows.reduce((acc: any, r) => {
acc[r.week_iso] ??= { week: r.week_iso, employees: new Set<string>(), hours: 0 }
acc[r.week_iso].employees.add(r.employee_id)
acc[r.week_iso].hours += r.hours
return acc
}, {})).map((o: any) => ({ week: o.week, employees: o.employees.size, hours: o.hours }))
return { active_employees, total_hours, avg_hours_per_employee, by_week }
}


projectsSummary(q: any) {
const rows = applyFilters(ENTRIES, q)
const projects = Object.values(rows.reduce((acc: any, r) => {
acc[r.project_id] ??= { project_id: r.project_id, project_name: r.project_name, hours: 0, employees: new Set<string>() }
acc[r.project_id].hours += r.hours
acc[r.project_id].employees.add(r.employee_id)
return acc
}, {})).map((p: any) => ({ ...p, employees: p.employees.size }))
const total_hours = rows.reduce((s, r) => s + r.hours, 0)
return { total_hours, projects }
}
}