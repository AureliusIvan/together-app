import {Inject, Injectable} from '@nestjs/common';
import {DynamoDBDocumentClient, GetCommand, GetCommandInput, PutCommand, PutCommandInput,} from '@aws-sdk/lib-dynamodb';
import {User} from './user.model';

/**
 * `UsersService` is a Service responsible for managing users in the database (using DynamoDB).
 * Available methods:
 * - `createUser(username: string, password: string): Promise<void>`
 * - `findUser(username: string): Promise<any>`
 * @class
 * @exports
 * @injectable
 * @public
 * @property {string} tableName - The name of the DynamoDB table.
 * @property {DynamoDBDocumentClient} dbClient - The DynamoDB client.
 * @method createUser - Create a new user in the database.
 * @method findUser - Find a user by username.
 * @example
 * import { UsersService } from './users.service';
 * import { User } from './user.model';
 *
 * const usersService = new UsersService();
 *
 * usersService.createUser('john_doe',
 *  'password123').then(() => {
 *  console.log('User created successfully');
 *  usersService.findUser('john_doe').then((user: User) => {
 *  console.log(user);
 *  });
 *  });
 *  @see https://docs.nestjs.com/providers#services
 *  @see https://docs.nestjs.com/recipes/cqrs
 *  @see https://docs.nestjs.com/recipes/cqrs#event-sourcing
 *  @see https://docs.nestjs.com/recipes/cqrs#sagas
 */
@Injectable()
export class UsersService {
  private readonly tableName = 'together-users';

  constructor(
    @Inject('DYNAMODB_CLIENT')
    private readonly dbClient: DynamoDBDocumentClient,
  ) {}

  /**
   * Create a new user in the database.
   * @param username
   * @param password
   * @returns {Promise<void>}
   * @example
   * await usersService.createUser('john
   * _doe', 'password123');
   */
  async createUser(username: string, password: string): Promise<void> {
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        username,
        password,
        createdAt: new Date().toISOString(),
      },
    };
    await this.dbClient.send(new PutCommand(params));
  }

  /**
   * Find a user by username.
   * @param username
   * @returns {Promise<any>}
   * @example
   * const user = await usersService.findUser('john_doe');
   * console.log(user);
   * // Output: { username: 'john_doe', password: 'password123', createdAt: '2022-01-01T00:00:00.000Z' }
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html#getCommand
   */
  async findUser(username: string): Promise<any> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: { username },
    };
    const result = await this.dbClient.send(new GetCommand(params));
    return result.Item ? new User(result.Item) : null;
  }
}
