import { Injectable } from '@nestjs/common';

interface Player {
  playerId: string;
  position: { x: number; y: number };
  lastActive: number;
}

@Injectable()
export class PlayerService {
  private players: Map<string, Player> = new Map();
  private clientIdToPlayerId: Map<string, string> = new Map();
  /**
   * The time in milliseconds after which a player is considered inactive.
   * @private
   */
  private inactivityThreshold: number = 60 * 1000;

  addPlayer(clientId: string, playerId: string): Player {
    const player: Player = {
      playerId,
      position: { x: Math.random() * 700 + 50, y: Math.random() * 500 + 50 },
      lastActive: Date.now(),
    };
    this.players.set(playerId, player);
    this.clientIdToPlayerId.set(clientId, playerId);
    return player;
  }

  removePlayer(clientId: string): void {
    const playerId = this.clientIdToPlayerId.get(clientId);
    if (playerId) {
      this.players.delete(playerId);
      this.clientIdToPlayerId.delete(clientId);
    }
  }

  updatePlayerPosition(
    playerId: string,
    position: { x: number; y: number },
  ): void {
    const player = this.players.get(playerId);
    if (player) {
      player.position = position;
      player.lastActive = Date.now();
    }
  }

  getPlayerById(playerId: string): Player | undefined {
    return this.players.get(playerId);
  }

  getPlayerByClientId(clientId: string): Player | undefined {
    const playerId = this.clientIdToPlayerId.get(clientId);
    return playerId ? this.players.get(playerId) : undefined;
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  removeInactivePlayers(): void {
    const currentTime = Date.now();
    this.players.forEach((player, playerId) => {
      if (currentTime - player.lastActive > this.inactivityThreshold) {
        this.players.delete(playerId);
      }
    });
  }
}
