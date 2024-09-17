import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { SignDto } from './dtos/sign.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('/auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  async checkStatus(@CurrentUser() user: User | null) {
    if (!user) {
      throw new UnauthorizedException('You are not authorized.');
    }
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async signup(@Body() body: SignDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }
}
