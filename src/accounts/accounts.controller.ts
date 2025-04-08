import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  getById(@Param('id') id: number) {
    return this.accountsService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body) {
    const account = body as unknown as Accounts;
    account.id = Number(id);
    return await this.accountsService.update(account);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.accountsService.delete(id);
  }
}
