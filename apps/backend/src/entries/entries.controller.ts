import { Controller, Get, Query } from '@nestjs/common'
import { EntriesService } from './entries.service'

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  list(@Query() q: any) {
    const rows = this.entriesService.getEntries(q)
    const limit = Number(q.limit ?? 50)
    const offset = Number(q.offset ?? 0)
    return { total: rows.length, items: rows.slice(offset, offset + limit) }
  }
}