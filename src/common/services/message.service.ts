import { Injectable } from '@nestjs/common';

import { CreateMessageDto, CreateMessagViewDto } from '../dto';
import { MessageView } from '../entities/message-view.entity';
import { Message } from '../entities/message.entity';
import { Room } from '../entities/room.entity';
import { MessageRepository, MessageViewRepository } from '../repositories';

@Injectable()
export class MessageService {
  constructor(
    public readonly messageRepository: MessageRepository,
    public readonly messageViewRepository: MessageViewRepository
  ) {}

  public createAndSave(createMessageDto: CreateMessageDto, room: Room): Promise<Message> {
    const message = new Message();

    message.authorId = createMessageDto.authorId;
    message.text = createMessageDto.text;
    message.createdAt = createMessageDto.createdAt;
    message.room = room;

    return this.messageRepository.save(message);
  }

  public createMessageView(createMessageViewDto: CreateMessagViewDto) {
    const messageView = new MessageView();

    messageView.seenAt = createMessageViewDto.seenAt;
    messageView.seenBy = createMessageViewDto.seenBy;
    messageView.messageId = createMessageViewDto.messageId;
    messageView.roomId = createMessageViewDto.roomId;

    return this.messageViewRepository.save(messageView);
  }
}
