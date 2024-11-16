import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}