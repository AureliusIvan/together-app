import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Player {
  id: string;
  position: { x: number; y: number };
  texture: string;
  lastActive: number;
}

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private players: Map<string, Player> = new Map();
  private clientIdToPlayerId: Map<string, string> = new Map();
  private inactivityThreshold: number = 30 * 1000;
  private inactivityCheckInterval: NodeJS.Timeout | null = null;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('players', Array.from(this.players.values()));

    if (!this.inactivityCheckInterval) {
      this.startInactivityCheck();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const playerId = this.clientIdToPlayerId.get(client.id);
    if (playerId) {
      this.players.delete(playerId);
      this.clientIdToPlayerId.delete(client.id);
      this.server.emit('players', Array.from(this.players.values()));
    }
  }

  @SubscribeMessage('join')
  handleJoin(
    client: Socket,
    {
      playerId,
    }: {
      playerId: string;
      position: { x: number; y: number };
    },
  ): void {
    console.log(`Received join data: ${JSON.stringify({ playerId })}`);
    if (!this.players.has(playerId)) {
      const player: Player = {
        id: playerId,
        position: { x: Math.random() * 700 + 50, y: Math.random() * 500 + 50 },
        texture: '/placeholder.svg?height=32&width=32',
        lastActive: Date.now(),
      };
      this.players.set(playerId, player);
      this.clientIdToPlayerId.set(client.id, playerId);
      client.emit('join', player);
      this.server.emit('players', Array.from(this.players.values()));
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
  ): void {
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

    const clientPlayerId = this.clientIdToPlayerId.get(client.id);
    if (clientPlayerId !== playerId) {
      console.error(
        `Client ${client.id} tried to move player ${playerId} but is not associated with that player.`,
      );
      return;
    }

    const player = this.players.get(playerId);

    if (!player) {
      console.error(`Player with ID ${playerId} not found.`);
      return;
    }

    player.position = position;
    player.lastActive = Date.now();
    console.log(`Player ${playerId} moved to (${position.x}, ${position.y})`);

    this.server.emit('playerMoved', { id: playerId, position });
  }

  @SubscribeMessage('chat message')
  handleChatMessage(
    client: Socket,
    {
      user_id: user_id,
      message: inputMessage,
    }: {
      user_id: string;
      message: string;
    },
  ): void {
    if (inputMessage.trim()) {
      this.server.emit('chat message', {
        user_id,
        message: inputMessage,
      });
    }
  }

  stopInactivityCheck() {
    if (this.inactivityCheckInterval) {
      clearInterval(this.inactivityCheckInterval);
      this.inactivityCheckInterval = null;
    }
  }

  private startInactivityCheck() {
    this.inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      this.players.forEach((player, playerId) => {
        if (currentTime - player.lastActive > this.inactivityThreshold) {
          console.log(`Player ${playerId} is inactive and will be removed.`);
          this.players.delete(playerId);
          this.server.emit('players', Array.from(this.players.values()));
        }
      });
    }, 5000);
  }
}
