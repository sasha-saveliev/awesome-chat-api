import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { Message } from '../entities/message.entity';

@Injectable()
export class MessageRepository {
  private readonly repository: Repository<Message> = getRepository(Message);

  public save(message: Message): Promise<Message> {
    return this.repository.save(message);
  }
}
