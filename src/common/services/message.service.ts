import { Injectable } from '@nestjs/common';

import { CreateMessageDto } from '../dto';
import { Message } from '../entities/message.entity';
import { Room } from '../entities/room.entity';
import { MessageRepository } from '../repositories';

@Injectable()
export class MessageService {
  constructor(public readonly messageRepository: MessageRepository) {}

  public createAndSave(createMessageDto: CreateMessageDto, room: Room): Promise<Message> {
    const message = new Message();

    message.authorId = createMessageDto.authorId;
    message.text = createMessageDto.text;
    message.timestamp = createMessageDto.timestamp;
    message.room = room;

    return this.messageRepository.save(message);
  }
}
