import { Controller, Get, Query } from '@nestjs/common'
import { MetricsService } from './metrics.service'


@Controller('metrics')
export class MetricsController {
constructor(private svc: MetricsService) {}


@Get('hours-summary') hours(@Query() q: any) { return this.svc.hoursSummary(q) }
@Get('employees-summary') employees(@Query() q: any) { return this.svc.employeesSummary(q) }
@Get('projects-summary') projects(@Query() q: any) { return this.svc.projectsSummary(q) }
}