import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from '../modules/player/player.module';
import { GameModule } from '../modules/game/game.module';
import { AuthModule } from '../modules/auth/auth.module';
import { dynamoDbProvider } from '../database/dynamodb.provider';

@Module({
  imports: [ConfigModule.forRoot(), PlayerModule, GameModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, dynamoDbProvider],
  exports: [dynamoDbProvider],
})
export class AppModule {}
