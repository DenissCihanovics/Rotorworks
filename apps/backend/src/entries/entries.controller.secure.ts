import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common'
import { EntriesService } from './entries.service'
import { DataFilterService } from '../common/services/data-filter.service'
import { DataAccessGuard } from '../auth/guards/data-access.guard'

@Controller('entries')
@UseGuards(DataAccessGuard)
export class EntriesControllerSecure {
  constructor(
    private readonly entriesService: EntriesService,
    private readonly dataFilterService: DataFilterService
  ) {}

  @Get()
  list(@Query() q: any, @Request() req: any) {
    const user = req.user;
    const allData = this.entriesService.getEntries();
    
    // Фильтруем данные по доступу пользователя
    const filteredData = this.dataFilterService.filterDataByUserAccess(allData, user, q);
    
    const limit = Number(q.limit ?? 50)
    const offset = Number(q.offset ?? 0)
    return { 
      total: filteredData.length, 
      items: filteredData.slice(offset, offset + limit),
      userAccess: {
        role: user.role,
        department: user.department,
        canViewAll: user.role === 'admin'
      }
    }
  }
}
