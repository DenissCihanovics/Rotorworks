import { Controller, Get } from '@nestjs/common'
import { FILTERS } from '../common/utils/mock-data'


@Controller('filters')
export class FiltersController {
@Get('departments') getDepartments() { return FILTERS.departments }
@Get('years') getYears() { return FILTERS.years }
@Get('weeks') getWeeks() { return FILTERS.weeks }
@Get('tasks') getTasks() { return FILTERS.tasks }
@Get('employee-types') getEmployeeTypes() { return FILTERS.employeeTypes }
@Get('projects') getProjects() { return FILTERS.projects }
@Get('employees') getEmployees() { return FILTERS.employees }
}