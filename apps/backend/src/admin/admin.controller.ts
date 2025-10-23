import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { User, UserRole, Department } from '../auth/schemas/user.schema';
import { DataFilterService } from '../common/services/data-filter.service';

// Mock данные для демонстрации (в будущем будет база данных)
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@company.com',
    password: 'hashed_password',
    firstName: 'Admin',
    lastName: 'User',
    department: 'IT',
    role: UserRole.ADMIN,
    permissions: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    username: 'manager1',
    email: 'manager1@company.com',
    password: 'hashed_password',
    firstName: 'John',
    lastName: 'Manager',
    department: 'Engineering',
    role: UserRole.MANAGER,
    permissions: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    username: 'employee1',
    email: 'employee1@company.com',
    password: 'hashed_password',
    firstName: 'Jane',
    lastName: 'Employee',
    department: 'Engineering',
    role: UserRole.EMPLOYEE,
    permissions: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'IT',
    name: 'Information Technology',
    description: 'IT Department',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'Engineering',
    name: 'Engineering',
    description: 'Engineering Department',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'Marketing',
    name: 'Marketing',
    description: 'Marketing Department',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

@Controller('admin')
export class AdminController {
  constructor(private readonly dataFilterService: DataFilterService) {}

  // Получение списка пользователей (только для админов)
  @Get('users')
  getUsers(@Request() req: any) {
    const user = req.user;
    
    if (user.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    return {
      users: MOCK_USERS.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        department: u.department,
        role: u.role,
        isActive: u.isActive,
        lastLogin: u.lastLogin
      })),
      total: MOCK_USERS.length
    };
  }

  // Создание нового пользователя
  @Post('users')
  createUser(@Body() userData: Partial<User>, @Request() req: any) {
    const admin = req.user;
    
    if (admin.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    // В реальном приложении здесь будет сохранение в базу данных
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username || '',
      email: userData.email || '',
      password: 'hashed_password',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      department: userData.department || '',
      role: userData.role || UserRole.EMPLOYEE,
      permissions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return {
      success: true,
      user: newUser,
      message: 'User created successfully'
    };
  }

  // Обновление пользователя
  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() userData: Partial<User>, @Request() req: any) {
    const admin = req.user;
    
    if (admin.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    // В реальном приложении здесь будет обновление в базе данных
    return {
      success: true,
      message: 'User updated successfully'
    };
  }

  // Удаление пользователя
  @Delete('users/:id')
  deleteUser(@Param('id') id: string, @Request() req: any) {
    const admin = req.user;
    
    if (admin.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    // В реальном приложении здесь будет удаление из базы данных
    return {
      success: true,
      message: 'User deleted successfully'
    };
  }

  // Получение департаментов
  @Get('departments')
  getDepartments() {
    return {
      departments: MOCK_DEPARTMENTS,
      total: MOCK_DEPARTMENTS.length
    };
  }

  // Создание департамента
  @Post('departments')
  createDepartment(@Body() departmentData: Partial<Department>, @Request() req: any) {
    const admin = req.user;
    
    if (admin.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    const newDepartment: Department = {
      id: departmentData.id || Date.now().toString(),
      name: departmentData.name || '',
      description: departmentData.description,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return {
      success: true,
      department: newDepartment,
      message: 'Department created successfully'
    };
  }

  // Статистика доступа пользователей
  @Get('access-stats')
  getAccessStats(@Request() req: any) {
    const admin = req.user;
    
    if (admin.role !== UserRole.ADMIN) {
      throw new Error('Access denied: Admin role required');
    }

    const stats = {
      totalUsers: MOCK_USERS.length,
      activeUsers: MOCK_USERS.filter(u => u.isActive).length,
      usersByRole: {
        admin: MOCK_USERS.filter(u => u.role === UserRole.ADMIN).length,
        manager: MOCK_USERS.filter(u => u.role === UserRole.MANAGER).length,
        employee: MOCK_USERS.filter(u => u.role === UserRole.EMPLOYEE).length,
        viewer: MOCK_USERS.filter(u => u.role === UserRole.VIEWER).length
      },
      usersByDepartment: MOCK_DEPARTMENTS.map(dept => ({
        department: dept.name,
        count: MOCK_USERS.filter(u => u.department === dept.id).length
      }))
    };

    return stats;
  }
}
