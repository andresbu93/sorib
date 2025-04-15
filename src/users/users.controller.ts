import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CustomAuthGuard } from 'src/auth/custom-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(CustomAuthGuard)
  @Get(':userId/movements')
  getMovements(@Query() qs, @Param('userId') userId: string) {
    let { filter, page } = qs;
    console.log(filter, page);

    if (!filter)
      filter = {
        userId,
      };

    filter.userId = userId;

    if (!page) page = { number: 0, size: 10 };
    if (page.number) page.number = Number(page.number - 1);

    return this.usersService.getMovementsByUser({
      filter,
      page,
    });
  }

  @UseGuards(CustomAuthGuard)
  @Get(':userId/accounts')
  getAccounts(@Param('userId') userId: string) {
    return this.usersService.getAccounts(userId);
  }
}
