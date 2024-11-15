import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayerService } from './player.service';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly playerService: PlayerService) {}

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('players', this.playerService.getAllPlayers());
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.playerService.removePlayer(client.id);
    this.server.emit('players', this.playerService.getAllPlayers());
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, { playerId }: { playerId: string }) {
    console.log(`Received join data: ${JSON.stringify({ playerId })}`);
    if (!this.playerService.getPlayerById(playerId)) {
      this.playerService.addPlayer(client.id, playerId);
      this.server.emit('players', this.playerService.getAllPlayers());
    } else {
      console.warn(`Player with ID ${playerId} already exists.`);
    }
  }

  @SubscribeMessage('move')
  handleMove(
    client: Socket,
    {
      playerId,
      position,
    }: { playerId: string; position: { x: number; y: number } },
  ) {
    console.log(
      `Received move data: ${JSON.stringify({ playerId, position })}`,
    );
    if (
      !playerId ||
      !position ||
      typeof position.x !== 'number' ||
      typeof position.y !== 'number'
    ) {
      console.error(
        `Invalid move data received: ${JSON.stringify({ playerId, position })}`,
      );
      return;
    }

    const clientPlayerId = this.playerService.getPlayerByClientId(
      client.id,
    )?.playerId;
    if (clientPlayerId !== playerId) {
      console.error(
        `Client ${client.id} tried to move player ${playerId} but is not associated with that player.`,
      );
      return;
    }

    this.playerService.updatePlayerPosition(playerId, position);
    console.log(`Player ${playerId} moved to (${position.x}, ${position.y})`);
    this.server.emit('playerMoved', { id: playerId, position });
  }

  @SubscribeMessage('chat message')
  handleChatMessage(
    client: Socket,
    { user_id, message }: { user_id: string; message: string },
  ) {
    if (message.trim()) {
      this.server.emit('chat message', { user_id, message });
    }
  }
}
