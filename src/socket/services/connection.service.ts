import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionService {
  public readonly connections: Map<string, number> = new Map();

  public getConnections(): Map<string, number> {
    return this.connections;
  }

  public getConnection(socketId: string): number {
    return this.connections.get(socketId);
  }

  public addConnection(socketId: string, userId: number): void {
    this.connections.set(socketId, userId);
  }

  public removeConnection(socketId: string): void {
    this.connections.delete(socketId);
  }
}
