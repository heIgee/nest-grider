import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PsuModule } from 'src/psu/psu.module';

@Module({
  providers: [DiskService],
  imports: [PsuModule],
  exports: [DiskService],
})
export class DiskModule {}
