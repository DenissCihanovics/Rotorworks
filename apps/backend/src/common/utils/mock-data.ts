export type Entry = {
    id: number
    entry_date: string // '2025-10-01'
    hours: number
    employee_id: string
    employee_name: string
    employee_type_id: 'RW' | 'Sub' | 'Temp'
    department_id: string
    project_id: string
    project_name: string
    task_id: string
    task_name: string
    week_iso: number
    year: number
    }
    
    
    // TODO: заменить импортом из Excel позже. Сейчас — синтетика.
    export const ENTRIES: Entry[] = [
    { id: 1, entry_date: '2025-09-29', hours: 7.5, employee_id: 'e1', employee_name: 'Anna Schmidt', employee_type_id: 'RW', department_id: 'D10', project_id: 'P100', project_name: 'Hotel Alpha', task_id: 'T-DEV', task_name: 'Development', week_iso: 40, year: 2025 },
    { id: 2, entry_date: '2025-09-30', hours: 6, employee_id: 'e2', employee_name: 'Jonas Weber', employee_type_id: 'Sub', department_id: 'D10', project_id: 'P100', project_name: 'Hotel Alpha', task_id: 'T-ANL', task_name: 'Analysis', week_iso: 40, year: 2025 },
    { id: 3, entry_date: '2025-10-01', hours: 8, employee_id: 'e3', employee_name: 'Lena Koch', employee_type_id: 'RW', department_id: 'D20', project_id: 'P200', project_name: 'Resort Beta', task_id: 'T-DEV', task_name: 'Development', week_iso: 40, year: 2025 },
    ]
    
    
    export const FILTERS = {
    departments: [ { id: 'D10', name: 'Operations' }, { id: 'D20', name: 'Engineering' } ],
    years: [2023, 2024, 2025],
    weeks: Array.from({ length: 53 }, (_, i) => i + 1),
    tasks: [ { id: 'T-DEV', name: 'Development' }, { id: 'T-ANL', name: 'Analysis' } ],
    employeeTypes: [ { id: 'RW', name: 'Employee' }, { id: 'Sub', name: 'Subcontractor' }, { id: 'Temp', name: 'Temporary' } ],
    projects: [ { id: 'P100', name: 'Hotel Alpha' }, { id: 'P200', name: 'Resort Beta' } ],
    employees: [ { id: 'e1', name: 'Anna Schmidt' }, { id: 'e2', name: 'Jonas Weber' }, { id: 'e3', name: 'Lena Koch' } ],
    }
    
    
    export function applyFilters(entries: Entry[], q: Partial<Record<string, string>>) {
    return entries.filter(e =>
    (!q.department_id || e.department_id === q.department_id) &&
    (!q.year || String(e.year) === String(q.year)) &&
    (!q.week || String(e.week_iso) === String(q.week)) &&
    (!q.task_id || e.task_id === q.task_id) &&
    (!q.employee_type_id || e.employee_type_id === q.employee_type_id) &&
    (!q.project_id || e.project_id === q.project_id) &&
    (!q.employee_id || e.employee_id === q.employee_id)
    )
    }