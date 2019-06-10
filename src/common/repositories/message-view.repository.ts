import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { MessageView } from '../entities/message-view.entity';

@Injectable()
export class MessageViewRepository {
  private readonly repository: Repository<MessageView> = getRepository(MessageView);

  public save(messageView: MessageView): Promise<MessageView> {
    return this.repository.save(messageView);
  }
}
