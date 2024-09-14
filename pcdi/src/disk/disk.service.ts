import { Injectable } from '@nestjs/common';
import { PsuService } from 'src/psu/psu.service';

@Injectable()
export class DiskService {
  constructor(private psuService: PsuService) {}

  readData(sector: number) {
    this.psuService.supplyPower(4);
    console.log('Disk is reading data...');
    return `[some data from sector: ${sector}]`;
  }
}
