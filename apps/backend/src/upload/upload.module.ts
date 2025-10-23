import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ExcelService } from '../common/services/excel.service';

@Module({
  controllers: [UploadController],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class UploadModule {}
