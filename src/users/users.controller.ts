import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/movements')
  async getMovements(@Param('userId') userId: number) {
    return this.usersService.getMovementsByUser(userId);
  }
}
