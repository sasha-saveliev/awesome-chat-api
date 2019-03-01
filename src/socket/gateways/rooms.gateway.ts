
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { Room } from '../../common/entities/room.entity';
import { User } from '../../common/entities/user.entity';
import { RoomService, UserService } from '../../common/services';
import { TokenPayload } from '../../modules/auth/interfaces';
import { CreateRoomDto } from '../dto';
import { RoomsEvents } from '../events';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() public server: SocketIO.Server;

  constructor(
    public readonly roomService: RoomService,
    public readonly userService: UserService,
    public readonly jwtService: JwtService
  ) {}

  public async handleConnection(client: SocketIO.Socket) {
    const tokenPayload: TokenPayload = this.jwtService.verify(client.handshake.query.token);
    const clientRooms = await this.roomService.findRoomsByUserId(tokenPayload.user.id);

    client.join(clientRooms.map(({ id }) => id.toString()));
  }

  @SubscribeMessage(RoomsEvents.CreateRoom)
  public async onEvent(client: SocketIO.Socket, createRoomDto: CreateRoomDto): Promise<Room> {
    const participants: User[] = await this.userService.findByIds(createRoomDto.participants);
    const room = await this.roomService.createAndSave(participants);

    client.join(room.id.toString());

    return room;
  }
}
