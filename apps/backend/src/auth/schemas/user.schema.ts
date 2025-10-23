// Схема пользователя для будущей базы данных
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // хэшированный
  firstName: string;
  lastName: string;
  department: string; // ID департамента
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'admin',           // Полный доступ ко всем данным
  MANAGER = 'manager',       // Доступ к данным своего департамента + подчиненных
  EMPLOYEE = 'employee',     // Доступ только к своим данным
  VIEWER = 'viewer'          // Только просмотр данных своего департамента
}

export enum Permission {
  // Данные
  VIEW_OWN_DATA = 'view_own_data',
  VIEW_DEPARTMENT_DATA = 'view_department_data',
  VIEW_ALL_DATA = 'view_all_data',
  
  // Отчеты
  GENERATE_OWN_REPORTS = 'generate_own_reports',
  GENERATE_DEPARTMENT_REPORTS = 'generate_department_reports',
  GENERATE_ALL_REPORTS = 'generate_all_reports',
  
  // Администрирование
  MANAGE_USERS = 'manage_users',
  MANAGE_DEPARTMENTS = 'manage_departments',
  UPLOAD_DATA = 'upload_data',
  
  // Настройки
  VIEW_SETTINGS = 'view_settings',
  MANAGE_SETTINGS = 'manage_settings'
}

// Маппинг ролей на разрешения
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.VIEW_ALL_DATA,
    Permission.GENERATE_ALL_REPORTS,
    Permission.MANAGE_USERS,
    Permission.MANAGE_DEPARTMENTS,
    Permission.UPLOAD_DATA,
    Permission.MANAGE_SETTINGS
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_DEPARTMENT_DATA,
    Permission.GENERATE_DEPARTMENT_REPORTS,
    Permission.VIEW_SETTINGS
  ],
  [UserRole.EMPLOYEE]: [
    Permission.VIEW_OWN_DATA,
    Permission.GENERATE_OWN_REPORTS
  ],
  [UserRole.VIEWER]: [
    Permission.VIEW_DEPARTMENT_DATA
  ]
};

// Схема департамента
export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string; 
  parentDepartmentId?: string; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
