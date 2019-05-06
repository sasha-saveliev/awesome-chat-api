
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { RoomService } from '../../common/services';
import { TokenPayload } from '../../modules/auth/interfaces';
import { UserStatusEvents } from '../events';
import { ConnectionService } from '../services/connection.service';

@WebSocketGateway()
export class ConnectionGateway {
  @WebSocketServer() public server: SocketIO.Server;

  constructor(
    public readonly jwtService: JwtService,
    public readonly roomService: RoomService,
    public readonly connectionService: ConnectionService
    ) { }

  public async handleConnection(client: SocketIO.Socket) {
    const tokenPayload: TokenPayload = this.jwtService.verify(client.handshake.query.token);
    const userId = tokenPayload.user.id;
    const clientRooms = await this.roomService.findRoomsByUserId(tokenPayload.user.id);

    this.connectionService.addConnection(client.id, userId);

    client.broadcast.emit(UserStatusEvents.Online, userId);
    client.join(clientRooms.map(({ id }) => id.toString()));
  }

  public handleDisconnect(client: SocketIO.Socket) {
    const userId = this.connectionService.getConnection(client.id);

    this.connectionService.removeConnection(client.id);
    client.broadcast.emit(UserStatusEvents.Offline, userId);
  }
}
