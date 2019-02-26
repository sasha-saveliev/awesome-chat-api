
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { Room } from '../../common/entities/room.entity';
import { User } from '../../common/entities/user.entity';
import { RoomService, UserService } from '../../common/services';
import { RoomsActions } from '../actions';
import { CreateRoomDto } from '../dto';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() public server: SocketIO.Server;

  constructor(
    public readonly roomService: RoomService,
    public readonly userService: UserService
  ) {}

  @SubscribeMessage(RoomsActions.CreateRoom)
  public async onEvent(client: SocketIO.Socket, createRoomDto: CreateRoomDto): Promise<Room> {
    const participants: User[] = await this.userService.findByIds(createRoomDto.participants);

    return this.roomService.createAndSave(participants);
  }
}
