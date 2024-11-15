import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {v4 as uuidv4} from 'uuid';

interface Player {
  id: string;
  position: { x: number; y: number };
  texture: string;
}

@WebSocketGateway({cors: true})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private players: Map<string, Player> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.players.delete(client.id);
    this.server.emit('players', Array.from(this.players.values()));
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket): void {
    const player: Player = {
      id: uuidv4(),
      position: {x: Math.random() * 700 + 50, y: Math.random() * 500 + 50},
      texture: '/placeholder.svg?height=32&width=32',
    };
    this.players.set(client.id, player);
    client.emit('join', player);
    this.server.emit('players', Array.from(this.players.values()));
  }

  @SubscribeMessage('move')
  handleMove(client: Socket, position: { x: number; y: number }): void {
    const player = this.players.get(client.id);
    if (player) {
      player.position = position;
      this.server.emit('players', Array.from(this.players.values()));
    }
  }

  @SubscribeMessage('chat message')
  handleChatMessage(client: Socket, msg: string): void {
    this.server.emit('chat message', {
      id: uuidv4(),
      sender: client.id,
      content: msg,
    });
  }
}
