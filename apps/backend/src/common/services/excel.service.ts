import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

export interface ExcelEntry {
  id: number;
  entry_date: string;
  hours: number;
  employee_id: string;
  employee_name: string;
  employee_type_id: 'RW' | 'Sub' | 'Temp';
  department_id: string;
  project_id: string;
  project_name: string;
  task_id: string;
  task_name: string;
  week_iso: number;
  year: number;
}

@Injectable()
export class ExcelService {
  private data: ExcelEntry[] = [];
  private lastUpdated: Date | null = null;

  // Загрузка данных из Excel файла
  async loadFromExcel(filePath: string): Promise<ExcelEntry[]> {
    try {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets['ProjectTimes']; // Имя листа из Excel
      
      if (!worksheet) {
        throw new Error('Worksheet "ProjectTimes" not found in Excel file');
      }

      // Конвертируем в JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Пропускаем заголовки (первая строка)
      const dataRows = jsonData.slice(1);
      
      const entries: ExcelEntry[] = [];
      
      dataRows.forEach((row: any, index: number) => {
        if (row.length < 15) return; // Минимальное количество колонок
        
        try {
          const entry: ExcelEntry = {
            id: index + 1,
            entry_date: this.formatDate(row[0]), // Колонка A
            hours: parseFloat(row[1]) || 0, // Колонка B
            employee_id: String(row[2] || ''), // Колонка C
            employee_name: String(row[3] || ''), // Колонка D
            employee_type_id: this.mapEmployeeType(row[4]), // Колонка E
            department_id: String(row[5] || ''), // Колонка F
            project_id: String(row[6] || ''), // Колонка G
            project_name: String(row[7] || ''), // Колонка H
            task_id: String(row[8] || ''), // Колонка I
            task_name: String(row[9] || ''), // Колонка J
            week_iso: parseInt(row[10]) || 0, // Колонка K
            year: parseInt(row[11]) || new Date().getFullYear(), // Колонка L
          };
          
          // Валидация данных
          if (entry.hours > 0 && entry.employee_name && entry.project_name) {
            entries.push(entry);
          }
        } catch (error) {
          console.warn(`Error parsing row ${index + 1}:`, error);
        }
      });
      
      this.data = entries;
      this.lastUpdated = new Date();
      
      console.log(`Loaded ${entries.length} entries from Excel file`);
      return entries;
      
    } catch (error) {
      console.error('Error loading Excel file:', error);
      throw new Error(`Failed to load Excel file: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Получение всех данных
  getData(): ExcelEntry[] {
    return this.data;
  }

  // Получение времени последнего обновления
  getLastUpdated(): Date | null {
    return this.lastUpdated;
  }

  // Фильтрация данных
  filterData(filters: any): ExcelEntry[] {
    let filtered = [...this.data];

    if (filters.department_id) {
      filtered = filtered.filter(entry => entry.department_id === filters.department_id);
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

    if (filters.employee_id) {
      filtered = filtered.filter(entry => entry.employee_id === filters.employee_id);
    }

    return filtered;
  }

  // Получение уникальных значений для фильтров
  getFilterOptions() {
    const departments = [...new Set(this.data.map(entry => entry.department_id))];
    const years = [...new Set(this.data.map(entry => entry.year))].sort();
    const weeks = [...new Set(this.data.map(entry => entry.week_iso))].sort();
    const tasks = [...new Set(this.data.map(entry => ({ id: entry.task_id, name: entry.task_name })))];
    const employeeTypes = [...new Set(this.data.map(entry => entry.employee_type_id))];
    const projects = [...new Set(this.data.map(entry => ({ id: entry.project_id, name: entry.project_name })))];
    const employees = [...new Set(this.data.map(entry => ({ id: entry.employee_id, name: entry.employee_name })))];

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

  // Вспомогательные методы
  private formatDate(dateValue: any): string {
    if (!dateValue) return new Date().toISOString().split('T')[0];
    
    if (typeof dateValue === 'number') {
      // Excel date serial number
      const date = new Date((dateValue - 25569) * 86400 * 1000);
      return date.toISOString().split('T')[0];
    }
    
    if (typeof dateValue === 'string') {
      return dateValue;
    }
    
    return new Date().toISOString().split('T')[0];
  }

  private mapEmployeeType(typeValue: any): 'RW' | 'Sub' | 'Temp' {
    const type = String(typeValue || '').toLowerCase();
    
    if (type.includes('rw') || type.includes('employee')) return 'RW';
    if (type.includes('sub') || type.includes('subcontractor')) return 'Sub';
    if (type.includes('temp') || type.includes('temporary')) return 'Temp';
    
    return 'RW'; // Default
  }
}
