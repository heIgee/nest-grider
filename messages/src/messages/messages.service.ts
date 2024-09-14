import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

interface IService {
  findAll(): Promise<object>;
  findById(id: string): Promise<object | undefined>;
  create(content: string): Promise<void>;
}

@Injectable()
export class MessagesService implements IService {
  constructor(private messagesRepo: MessagesRepository) {}

  async findAll(): Promise<object> {
    return this.messagesRepo.findAll();
  }

  async findById(id: string): Promise<object | undefined> {
    return this.messagesRepo.findById(id);
  }

  async create(content: string): Promise<void> {
    return this.messagesRepo.create(content);
  }
}
