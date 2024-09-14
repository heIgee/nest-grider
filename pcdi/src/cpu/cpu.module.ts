import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PsuModule } from 'src/psu/psu.module';

@Module({
  providers: [CpuService],
  imports: [PsuModule],
  exports: [CpuService],
})
export class CpuModule {}
