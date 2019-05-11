
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { CreateMessageDto, TypingMessageDto } from '../../common/dto';
import { MessageService, RoomService } from '../../common/services';
import { MessagesEvents } from '../events';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer() public server: SocketIO.Server;

  constructor(
    public readonly roomService: RoomService,
    public readonly messageService: MessageService
  ) {}

  @SubscribeMessage(MessagesEvents.CreateMessage)
  public async onCreateMessage(client: SocketIO.Socket, createMessageDto: CreateMessageDto) {
    const room = await this.roomService.findById(createMessageDto.roomId);
    const savedMessage = await this.messageService.createAndSave(createMessageDto, room);

    client.broadcast
      .to(createMessageDto.roomId.toString())
      .emit(MessagesEvents.NewMessage, savedMessage);

    return savedMessage;
  }

  @SubscribeMessage(MessagesEvents.TypingMessage)
  public async onTypingMessage(client: SocketIO.Socket, typingMessageDto: TypingMessageDto) {
    client.broadcast
      .to(typingMessageDto.roomId.toString())
      .emit(MessagesEvents.TypingMessage, typingMessageDto);
  }

  @SubscribeMessage(MessagesEvents.StopTypingMessage)
  public async onStopTypingMessage(client: SocketIO.Socket, typingMessageDto: TypingMessageDto) {
    client.broadcast
      .to(typingMessageDto.roomId.toString())
      .emit(MessagesEvents.StopTypingMessage, typingMessageDto);
  }
}
