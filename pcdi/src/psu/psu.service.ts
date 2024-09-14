import { Injectable } from '@nestjs/common';

@Injectable()
export class PsuService {
  supplyPower(watts: number) {
    console.log(`Supplying ${watts}W of power.`);
  }
}
