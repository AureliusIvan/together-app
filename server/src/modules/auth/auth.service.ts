import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user
   * @param username
   * @param password
   * @returns Promise<any>
   * @throws UnauthorizedException
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<{
    username: string;
    createdAt: string;
  }> {
    const user: User | null = await this.usersService.findUser(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Login user
   * @param user
   */
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Register user
   * @param username
   * @param password
   */
  async register(username: string, password: string) {
    await this.usersService.createUser(username, password);
    return this.login({ username });
  }
}
