import { Controller, Get, Query } from '@nestjs/common'
import { ENTRIES, applyFilters } from '../common/utils/mock-data'


@Controller('entries')
export class EntriesController {
@Get()
list(@Query() q: any) {
const rows = applyFilters(ENTRIES, q)
const limit = Number(q.limit ?? 50)
const offset = Number(q.offset ?? 0)
return { total: rows.length, items: rows.slice(offset, offset + limit) }
}
}