import { Injectable } from '@nestjs/common';
import { PsuService } from 'src/psu/psu.service';

@Injectable()
export class CpuService {
  constructor(private psuService: PsuService) {}

  compute(x: number, y: number) {
    this.psuService.supplyPower(65);
    console.log('CPU is computing...');
    return x ^ y;
  }
}
