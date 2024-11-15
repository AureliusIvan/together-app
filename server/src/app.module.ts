import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game.gateway';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player.module';

@Module({
  imports: [ConfigModule.forRoot(), PlayerModule],
  controllers: [AppController],
  providers: [AppService, GameGateway],
})
export class AppModule {}
