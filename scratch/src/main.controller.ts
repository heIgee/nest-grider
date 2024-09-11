import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/hi')
  getHi() {
    return 'hi Nest!';
  }
  @Get('/bye')
  getBye() {
    return 'bye Nest!';
  }
}