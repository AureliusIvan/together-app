import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get user profile
   */
  @UseGuards(JwtAuthGuard) // Protect this route
  @Get('profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}
