import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../../auth/schemas/user.schema';

@Injectable()
export class DataFilterService {
  
  // Фильтрация данных в зависимости от роли пользователя
  filterDataByUserAccess(data: any[], user: User, requestedFilters: any = {}): any[] {
    const filters = { ...requestedFilters };

    // Админ видит все данные
    if (user.role === UserRole.ADMIN) {
      return data;
    }

    // Менеджер видит данные своего департамента
    if (user.role === UserRole.MANAGER) {
      filters.department_id = user.department;
      return this.applyFilters(data, filters);
    }

    // Сотрудник видит только свои данные
    if (user.role === UserRole.EMPLOYEE) {
      filters.employee_id = user.id;
      return this.applyFilters(data, filters);
    }

    // Viewer видит данные своего департамента (только просмотр)
    if (user.role === UserRole.VIEWER) {
      filters.department_id = user.department;
      return this.applyFilters(data, filters);
    }

    return [];
  }

  // Применение фильтров к данным
  private applyFilters(data: any[], filters: any): any[] {
    let filtered = [...data];

    if (filters.department_id) {
      filtered = filtered.filter(entry => entry.department_id === filters.department_id);
    }

    if (filters.employee_id) {
      filtered = filtered.filter(entry => entry.employee_id === filters.employee_id);
    }

    if (filters.year) {
      filtered = filtered.filter(entry => entry.year === parseInt(filters.year));
    }

    if (filters.week) {
      filtered = filtered.filter(entry => entry.week_iso === parseInt(filters.week));
    }

    if (filters.task_id) {
      filtered = filtered.filter(entry => entry.task_id === filters.task_id);
    }

    if (filters.employee_type_id) {
      filtered = filtered.filter(entry => entry.employee_type_id === filters.employee_type_id);
    }

    if (filters.project_id) {
      filtered = filtered.filter(entry => entry.project_id === filters.project_id);
    }

    return filtered;
  }

  // Получение доступных фильтров для пользователя
  getAvailableFilters(user: User, allData: any[]): any {
    const userData = this.filterDataByUserAccess(allData, user);
    
    const departments = [...new Set(userData.map(entry => entry.department_id))];
    const years = [...new Set(userData.map(entry => entry.year))].sort();
    const weeks = [...new Set(userData.map(entry => entry.week_iso))].sort();
    const tasks = [...new Set(userData.map(entry => ({ id: entry.task_id, name: entry.task_name })))];
    const employeeTypes = [...new Set(userData.map(entry => entry.employee_type_id))];
    const projects = [...new Set(userData.map(entry => ({ id: entry.project_id, name: entry.project_name })))];
    const employees = [...new Set(userData.map(entry => ({ id: entry.employee_id, name: entry.employee_name })))];

    return {
      departments: departments.map(id => ({ id, name: id })),
      years,
      weeks,
      tasks,
      employeeTypes: employeeTypes.map(type => ({ id: type, name: type })),
      projects,
      employees
    };
  }

  // Проверка доступа к отчетам
  canGenerateReport(user: User, reportType: string): boolean {
    switch (user.role) {
      case UserRole.ADMIN:
        return true; // Админ может генерировать любые отчеты
      
      case UserRole.MANAGER:
        return ['weekly', 'monthly', 'department', 'employee', 'project'].includes(reportType);
      
      case UserRole.EMPLOYEE:
        return ['weekly', 'employee'].includes(reportType);
      
      case UserRole.VIEWER:
        return ['weekly', 'monthly', 'department'].includes(reportType);
      
      default:
        return false;
    }
  }

  // Получение доступных типов отчетов для пользователя
  getAvailableReportTypes(user: User): string[] {
    const allReportTypes = ['weekly', 'monthly', 'department', 'employee', 'project', 'financial'];
    
    return allReportTypes.filter(reportType => 
      this.canGenerateReport(user, reportType)
    );
  }
}
