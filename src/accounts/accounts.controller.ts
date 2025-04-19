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
import { Accounts, Transfer } from './accounts.interface';
import { CustomAuthGuard } from 'src/auth/custom-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(CustomAuthGuard)
  @Post()
  async createOne(@Request() req) {
    console.log(req.user);
    const account = req.body as unknown as Accounts;
    account.userId = req.user.userId;
    return await this.accountsService.createOne(account);
  }

  @UseGuards(CustomAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.accountsService.findById(Number(id));
  }

  @UseGuards(CustomAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body) {
    const account = body as unknown as Accounts;
    account.id = Number(id);
    return await this.accountsService.update(account);
  }

  @UseGuards(CustomAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.accountsService.delete(id);
  }

  @UseGuards(CustomAuthGuard)
  @Post('/transfers')
  async transfer(@Request() req) {
    const body = req.body as unknown as Transfer;
    body.userId = req.user.userId;
    return await this.accountsService.transfer(body);
  }
}
