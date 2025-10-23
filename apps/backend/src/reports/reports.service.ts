import { Injectable } from '@nestjs/common';
import { ExcelService } from '../common/services/excel.service';
import * as ExcelJS from 'exceljs';

export interface ReportData {
  title: string;
  period: string;
  generatedAt: Date;
  data: any[];
  summary: any;
}

@Injectable()
export class ReportsService {
  constructor(private readonly excelService: ExcelService) {}

  // Генерация Weekly Summary отчета
  async generateWeeklyReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareWeeklyData(data);
    
    return this.generateExcelReport('Weekly Summary', reportData);
  }

  // Генерация Monthly Analytics отчета
  async generateMonthlyReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareMonthlyData(data);
    
    return this.generateExcelReport('Monthly Analytics', reportData);
  }

  // Генерация Department Report
  async generateDepartmentReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareDepartmentData(data);
    
    return this.generateExcelReport('Department Report', reportData);
  }

  // Генерация Employee Performance отчета
  async generateEmployeeReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareEmployeeData(data);
    
    return this.generateExcelReport('Employee Performance', reportData);
  }

  // Генерация Project Status отчета
  async generateProjectReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareProjectData(data);
    
    return this.generateExcelReport('Project Status', reportData);
  }

  // Генерация Financial Summary отчета
  async generateFinancialReport(filters: any = {}): Promise<Buffer> {
    const data = this.excelService.filterData(filters);
    const reportData = this.prepareFinancialData(data);
    
    return this.generateExcelReport('Financial Summary', reportData);
  }

  // Основной метод генерации Excel отчета
  private async generateExcelReport(title: string, data: any): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Заголовок отчета
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = title;
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    // Дата генерации
    worksheet.getCell('A2').value = `Generated: ${new Date().toLocaleDateString()}`;
    worksheet.getCell('A2').font = { size: 10, italic: true };

    // Добавляем данные в зависимости от типа отчета
    this.addReportData(worksheet, data, title);

    // Стилизация
    this.styleWorksheet(worksheet);

    // Возвращаем буфер
    return Buffer.from(await workbook.xlsx.writeBuffer());
  }

  // Подготовка данных для Weekly отчета
  private prepareWeeklyData(data: any[]) {
    const weeklySummary = data.reduce((acc, entry) => {
      const week = entry.week_iso;
      if (!acc[week]) {
        acc[week] = {
          week: week,
          totalHours: 0,
          employees: new Set(),
          projects: new Set(),
          departments: new Set()
        };
      }
      acc[week].totalHours += entry.hours;
      acc[week].employees.add(entry.employee_name);
      acc[week].projects.add(entry.project_name);
      acc[week].departments.add(entry.department_id);
      return acc;
    }, {});

    return Object.values(weeklySummary).map((week: any) => ({
      Week: week.week,
      'Total Hours': week.totalHours,
      'Active Employees': week.employees.size,
      'Active Projects': week.projects.size,
      'Departments': week.departments.size
    }));
  }

  // Подготовка данных для Monthly отчета
  private prepareMonthlyData(data: any[]) {
    const monthlySummary = data.reduce((acc, entry) => {
      const month = new Date(entry.entry_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = {
          month: month,
          totalHours: 0,
          employees: new Set(),
          projects: new Set(),
          tasks: new Set()
        };
      }
      acc[month].totalHours += entry.hours;
      acc[month].employees.add(entry.employee_name);
      acc[month].projects.add(entry.project_name);
      acc[month].tasks.add(entry.task_name);
      return acc;
    }, {});

    return Object.values(monthlySummary).map((month: any) => ({
      Month: month.month,
      'Total Hours': month.totalHours,
      'Active Employees': month.employees.size,
      'Active Projects': month.projects.size,
      'Task Types': month.tasks.size
    }));
  }

  // Подготовка данных для Department отчета
  private prepareDepartmentData(data: any[]) {
    const departmentSummary = data.reduce((acc, entry) => {
      const dept = entry.department_id;
      if (!acc[dept]) {
        acc[dept] = {
          department: dept,
          totalHours: 0,
          employees: new Set(),
          projects: new Set(),
          avgHoursPerEmployee: 0
        };
      }
      acc[dept].totalHours += entry.hours;
      acc[dept].employees.add(entry.employee_name);
      acc[dept].projects.add(entry.project_name);
      return acc;
    }, {});

    return Object.values(departmentSummary).map((dept: any) => ({
      Department: dept.department,
      'Total Hours': dept.totalHours,
      'Active Employees': dept.employees.size,
      'Active Projects': dept.projects.size,
      'Avg Hours/Employee': (dept.totalHours / dept.employees.size).toFixed(1)
    }));
  }

  // Подготовка данных для Employee отчета
  private prepareEmployeeData(data: any[]) {
    const employeeSummary = data.reduce((acc, entry) => {
      const emp = entry.employee_name;
      if (!acc[emp]) {
        acc[emp] = {
          employee: emp,
          type: entry.employee_type_id,
          totalHours: 0,
          projects: new Set(),
          tasks: new Set(),
          avgHoursPerProject: 0
        };
      }
      acc[emp].totalHours += entry.hours;
      acc[emp].projects.add(entry.project_name);
      acc[emp].tasks.add(entry.task_name);
      return acc;
    }, {});

    return Object.values(employeeSummary).map((emp: any) => ({
      Employee: emp.employee,
      Type: emp.type,
      'Total Hours': emp.totalHours,
      'Active Projects': emp.projects.size,
      'Task Types': emp.tasks.size,
      'Avg Hours/Project': (emp.totalHours / emp.projects.size).toFixed(1)
    }));
  }

  // Подготовка данных для Project отчета
  private prepareProjectData(data: any[]) {
    const projectSummary = data.reduce((acc, entry) => {
      const proj = entry.project_name;
      if (!acc[proj]) {
        acc[proj] = {
          project: proj,
          totalHours: 0,
          employees: new Set(),
          departments: new Set(),
          tasks: new Set(),
          completionRate: 0
        };
      }
      acc[proj].totalHours += entry.hours;
      acc[proj].employees.add(entry.employee_name);
      acc[proj].departments.add(entry.department_id);
      acc[proj].tasks.add(entry.task_name);
      return acc;
    }, {});

    return Object.values(projectSummary).map((proj: any) => ({
      Project: proj.project,
      'Total Hours': proj.totalHours,
      'Team Size': proj.employees.size,
      'Departments': proj.departments.size,
      'Task Types': proj.tasks.size,
      'Completion Rate': '85%' // Mock data
    }));
  }

  // Подготовка данных для Financial отчета
  private prepareFinancialData(data: any[]) {
    const financialSummary = data.reduce((acc, entry) => {
      const dept = entry.department_id;
      if (!acc[dept]) {
        acc[dept] = {
          department: dept,
          totalHours: 0,
          estimatedCost: 0,
          employees: new Set()
        };
      }
      acc[dept].totalHours += entry.hours;
      acc[dept].employees.add(entry.employee_name);
      return acc;
    }, {});

    return Object.values(financialSummary).map((dept: any) => ({
      Department: dept.department,
      'Total Hours': dept.totalHours,
      'Estimated Cost': (dept.totalHours * 50).toFixed(2), // Mock rate $50/hour
      'Active Employees': dept.employees.size,
      'Cost per Employee': ((dept.totalHours * 50) / dept.employees.size).toFixed(2)
    }));
  }

  // Добавление данных в Excel
  private addReportData(worksheet: any, data: any[], title: string) {
    if (data.length === 0) {
      worksheet.getCell('A4').value = 'No data available';
      return;
    }

    // Заголовки колонок
    const headers = Object.keys(data[0]);
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(4, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6E6FA' }
      };
    });

    // Данные
    data.forEach((row, rowIndex) => {
      headers.forEach((header, colIndex) => {
        worksheet.getCell(rowIndex + 5, colIndex + 1).value = row[header];
      });
    });
  }

  // Стилизация листа
  private styleWorksheet(worksheet: any) {
    // Автоподбор ширины колонок
    worksheet.columns.forEach((column: any) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    // Границы для всех ячеек
    const range = worksheet.getUsedRange();
    if (range) {
      range.forEach((row: any) => {
        row.forEach((cell: any) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });
    }
  }
}
