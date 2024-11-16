import { Module } from '@nestjs/common';
import { dynamoDbProvider } from './dynamodb.provider';

@Module({
  providers: [dynamoDbProvider],
  exports: [dynamoDbProvider],
})
export class DatabaseModule {}
