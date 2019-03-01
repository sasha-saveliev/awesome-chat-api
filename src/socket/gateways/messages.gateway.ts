
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { CreateMessageDto } from '../../common/dto';
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
  public async onEvent(client: SocketIO.Socket, createMessageDto: CreateMessageDto) {
    const room = await this.roomService.findById(createMessageDto.roomId);
    const savedMessage = await this.messageService.createAndSave(createMessageDto, room);

    this.server
      .to(createMessageDto.roomId.toString())
      .emit(MessagesEvents.NewMessage, savedMessage);

    return savedMessage;
  }
}
