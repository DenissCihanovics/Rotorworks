import { Controller, Get, Query, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('weekly')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="weekly-report.xlsx"')
  async generateWeeklyReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateWeeklyReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate weekly report' });
    }
  }

  @Get('monthly')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="monthly-report.xlsx"')
  async generateMonthlyReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateMonthlyReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate monthly report' });
    }
  }

  @Get('department')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="department-report.xlsx"')
  async generateDepartmentReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateDepartmentReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate department report' });
    }
  }

  @Get('employee')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="employee-report.xlsx"')
  async generateEmployeeReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateEmployeeReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate employee report' });
    }
  }

  @Get('project')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="project-report.xlsx"')
  async generateProjectReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateProjectReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate project report' });
    }
  }

  @Get('financial')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="financial-report.xlsx"')
  async generateFinancialReport(@Query() filters: any, @Res() res: Response) {
    try {
      const buffer = await this.reportsService.generateFinancialReport(filters);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate financial report' });
    }
  }

  // Preview endpoints (возвращают JSON для предварительного просмотра)
  @Get('weekly/preview')
  async previewWeeklyReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateWeeklyReport(filters);
      return {
        success: true,
        message: 'Weekly report preview generated',
        size: data.length,
        type: 'weekly'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate weekly report preview'
      };
    }
  }

  @Get('monthly/preview')
  async previewMonthlyReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateMonthlyReport(filters);
      return {
        success: true,
        message: 'Monthly report preview generated',
        size: data.length,
        type: 'monthly'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate monthly report preview'
      };
    }
  }

  @Get('department/preview')
  async previewDepartmentReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateDepartmentReport(filters);
      return {
        success: true,
        message: 'Department report preview generated',
        size: data.length,
        type: 'department'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate department report preview'
      };
    }
  }

  @Get('employee/preview')
  async previewEmployeeReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateEmployeeReport(filters);
      return {
        success: true,
        message: 'Employee report preview generated',
        size: data.length,
        type: 'employee'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate employee report preview'
      };
    }
  }

  @Get('project/preview')
  async previewProjectReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateProjectReport(filters);
      return {
        success: true,
        message: 'Project report preview generated',
        size: data.length,
        type: 'project'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate project report preview'
      };
    }
  }

  @Get('financial/preview')
  async previewFinancialReport(@Query() filters: any) {
    try {
      const data = await this.reportsService.generateFinancialReport(filters);
      return {
        success: true,
        message: 'Financial report preview generated',
        size: data.length,
        type: 'financial'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate financial report preview'
      };
    }
  }
}
