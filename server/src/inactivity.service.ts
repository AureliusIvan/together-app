import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PlayerService } from './player.service';

@Injectable()
export class InactivityService implements OnModuleInit, OnModuleDestroy {
  private inactivityCheckInterval: NodeJS.Timeout | null = null;

  constructor(private readonly playerService: PlayerService) {}

  onModuleInit() {
    this.startInactivityCheck();
  }

  onModuleDestroy() {
    this.stopInactivityCheck();
  }

  private startInactivityCheck() {
    this.inactivityCheckInterval = setInterval(() => {
      this.playerService.removeInactivePlayers();
    }, 5000);
  }

  private stopInactivityCheck() {
    if (this.inactivityCheckInterval) {
      clearInterval(this.inactivityCheckInterval);
      this.inactivityCheckInterval = null;
    }
  }
}
