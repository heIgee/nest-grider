import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

interface IRepository {
  findAll(): Promise<object>;
  findById(id: string): Promise<object | undefined>;
  create(content: string): Promise<void>;
}

@Injectable()
export class MessagesRepository implements IRepository {
  private async readDbFile(): Promise<object> {
    const contents = await readFile('messages.json', 'utf-8');
    return await JSON.parse(contents);
  }

  async findAll(): Promise<object> {
    const messages = await this.readDbFile();
    return messages;
  }

  async findById(id: string): Promise<object | undefined> {
    const messages = await this.readDbFile();
    return messages[id];
  }

  async create(content: string): Promise<void> {
    const messages = await this.readDbFile();
    const id = (Math.random() * 999) | 0;
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
