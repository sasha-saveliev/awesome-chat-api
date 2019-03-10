import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { Room } from '../../common/entities/room.entity';
import { User } from '../../common/entities/user.entity';
import { RoomService, UserService } from '../../common/services';
import { CreateRoomDto } from '../dto';
import { RoomsEvents } from '../events';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() public readonly server: SocketIO.Server;

  constructor(
    public readonly roomService: RoomService,
    public readonly userService: UserService
  ) {}

  @SubscribeMessage(RoomsEvents.CreateRoom)
  public async onEvent(client: SocketIO.Socket, createRoomDto: CreateRoomDto): Promise<Room> {
    const participants: User[] = await this.userService.findByIds(createRoomDto.participants);
    const room = await this.roomService.createAndSave(participants);

    client.join(room.id.toString());

    return room;
  }
}
