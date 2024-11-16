import {IsNotEmpty, IsString} from 'class-validator';

/**
 * Login DTO class
 * @class
 * @name LoginDto
 * @public
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @example
 * const loginDto = new LoginDto();
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
