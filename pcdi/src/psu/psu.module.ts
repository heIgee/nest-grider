import { Module } from '@nestjs/common';
import { PsuService } from './psu.service';

@Module({
  providers: [PsuService],
  exports: [PsuService],
})
export class PsuModule {}
