import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Accounts } from './accounts.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Request() req) {
    const account = req.body as unknown as Accounts;
    account.user = {
      id: Number(req.user.userId),
    };
    return await this.accountsService.createOne(account);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.accountsService.findById(Number(id));
  }
}
