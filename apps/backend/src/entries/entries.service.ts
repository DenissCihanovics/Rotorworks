import { Injectable } from '@nestjs/common';
import { ExcelService } from '../common/services/excel.service';

@Injectable()
export class EntriesService {
  constructor(private readonly excelService: ExcelService) {}

  getEntries(filters: any = {}) {
    return this.excelService.filterData(filters);
  }

  getEntriesCount(filters: any = {}) {
    return this.excelService.filterData(filters).length;
  }
}
