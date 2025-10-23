import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User, Permission, UserRole } from '../schemas/user.schema';

@Injectable()
export class DataAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Проверяем разрешения пользователя
    return this.checkDataAccess(user, request);
  }

  private checkDataAccess(user: User, request: any): boolean {
    const { department_id, employee_id } = request.query;
    
    // Админ имеет доступ ко всем данным
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Менеджер может видеть данные своего департамента
    if (user.role === UserRole.MANAGER) {
      if (department_id && department_id !== user.department) {
        throw new ForbiddenException('Access denied: Cannot view other department data');
      }
      return true;
    }

    // Сотрудник может видеть только свои данные
    if (user.role === UserRole.EMPLOYEE) {
      if (employee_id && employee_id !== user.id) {
        throw new ForbiddenException('Access denied: Cannot view other employee data');
      }
      if (department_id && department_id !== user.department) {
        throw new ForbiddenException('Access denied: Cannot view other department data');
      }
      return true;
    }

    // Viewer может видеть только данные своего департамента
    if (user.role === UserRole.VIEWER) {
      if (department_id && department_id !== user.department) {
        throw new ForbiddenException('Access denied: Cannot view other department data');
      }
      return true;
    }

    return false;
  }
}

// Декоратор для проверки разрешений
export function RequirePermission(permission: Permission) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const request = args[0]; // Предполагаем, что первый аргумент - request
      const user: User = request.user;
      
      if (!user || !user.permissions.includes(permission)) {
        throw new ForbiddenException(`Permission required: ${permission}`);
      }
      
      return method.apply(this, args);
    };
  };
}
