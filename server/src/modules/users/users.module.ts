import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {DatabaseModule} from '../../database/database.module';

/**
 * The UsersModule is a feature module that encapsulates the user-related functionality.
 * It imports the DatabaseModule to provide the DynamoDB client to the UsersService.
 * @class
 * @exports
 */
@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
