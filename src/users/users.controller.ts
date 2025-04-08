import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/movements')
  getMovements(@Query() qs, @Param('userId') userId: number) {
    let { filter, page } = qs;

    if (!filter)
      filter = {
        userId,
      };

    filter.userId = userId;

    if (!page) page = { number: 0, size: 10 };

    return this.usersService.getMovementsByUser({
      filter,
      page,
    });
  }

  @Get(':userId/accounts')
  getAccounts(@Param('userId') userId: number) {
    return this.usersService.getAccounts(userId);
  }
}
