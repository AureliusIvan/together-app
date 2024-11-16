/**
 * User model
 * @class
 * @exports
 * @public
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {string} createdAt - The date the user was created.
 * @constructor
 * @param {Partial<User>} partial - The partial user object.
 * @example
 * const user = new User({
 *  username: 'john_doe',
 *  password: 'password123',
 *  createdAt: new Date().toISOString(),
 *  });
 *  @see https://docs.nestjs.com/recipes/cqrs
 */
export class User {
  username: string;
  password: string;
  createdAt: string; // ISO date string

  constructor(partial: Partial<User>) {
    Object.assign(this, partial); // Initialize properties dynamically
  }
}
