import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  create(newUser: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(newUser);
    return this.usersRepo.save(user);
  }

  async findOne(id: number | undefined | null): Promise<User | null> {
    if (!id) return null;
    return await this.usersRepo.findOneBy({ id });
  }

  find(email: string | undefined): Promise<User[]> {
    return this.usersRepo.findBy({ email });
  }

  async update(id: number, attrs: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with id: ${id} is not found.`);
    Object.assign(user, attrs);
    return this.usersRepo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with id: ${id} is not found.`);
    return this.usersRepo.remove(user);
  }
}
