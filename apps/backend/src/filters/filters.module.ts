import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { ExcelService } from '../common/services/excel.service';

@Module({
  controllers: [FiltersController],
  providers: [ExcelService],
})
export class FiltersModule {}
