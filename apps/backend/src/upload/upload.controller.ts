import { Controller, Post, Get, Res, Body } from '@nestjs/common';
import { ExcelService } from '../common/services/excel.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('excel')
  async uploadExcel(@Body() body: any) {
    // Пока что возвращаем mock данные
    // В реальном приложении здесь будет обработка загруженного файла
    try {
      return {
        success: true,
        message: 'Excel upload endpoint ready (mock implementation)',
        entriesCount: 0,
        lastUpdated: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: `Error processing Excel file: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  @Get('status')
  getUploadStatus() {
    const lastUpdated = this.excelService.getLastUpdated();
    const dataCount = this.excelService.getData().length;
    
    return {
      hasData: dataCount > 0,
      entriesCount: dataCount,
      lastUpdated: lastUpdated,
      status: dataCount > 0 ? 'ready' : 'no_data'
    };
  }
}
