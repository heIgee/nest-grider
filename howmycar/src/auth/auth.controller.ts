import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.authService.create(body);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.authService.findOne(id);
    if (!user) throw new NotFoundException(`User with id: ${id} is not found.`);
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.authService.find(email);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.authService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.remove(id);
  }
}
