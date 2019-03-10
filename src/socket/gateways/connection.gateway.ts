
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { RoomService } from '../../common/services';
import { TokenPayload } from '../../modules/auth/interfaces';
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
    const clientRooms = await this.roomService.findRoomsByUserId(tokenPayload.user.id);

    this.connectionService.addConnection(client.id, tokenPayload.user.id);
    client.join(clientRooms.map(({ id }) => id.toString()));
  }

  public handleDisconnect(client: SocketIO.Socket) {
    this.connectionService.removeConnection(client.id);
  }
}
