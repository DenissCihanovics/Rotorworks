import { Controller, Get } from '@nestjs/common'
import { ExcelService } from '../common/services/excel.service'

@Controller('filters')
export class FiltersController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('departments') getDepartments() { 
    return this.excelService.getFilterOptions().departments 
  }
  
  @Get('years') getYears() { 
    return this.excelService.getFilterOptions().years 
  }
  
  @Get('weeks') getWeeks() { 
    return this.excelService.getFilterOptions().weeks 
  }
  
  @Get('tasks') getTasks() { 
    return this.excelService.getFilterOptions().tasks 
  }
  
  @Get('employee-types') getEmployeeTypes() { 
    return this.excelService.getFilterOptions().employeeTypes 
  }
  
  @Get('projects') getProjects() { 
    return this.excelService.getFilterOptions().projects 
  }
  
  @Get('employees') getEmployees() { 
    return this.excelService.getFilterOptions().employees 
  }
}