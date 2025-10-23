import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { ExcelService } from '../common/services/excel.service';

@Module({
  controllers: [EntriesController],
  providers: [EntriesService, ExcelService],
})
export class EntriesModule {}
