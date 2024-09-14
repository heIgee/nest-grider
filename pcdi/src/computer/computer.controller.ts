import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  run() {
    const x = 69,
      y = 420;
    return [
      'Computer is running...',
      `Here is your ${x} ^ ${y} = ${this.cpuService.compute(x, y)}.`,
      `And ${this.diskService.readData(5005)}.`,
    ];
  }
}
