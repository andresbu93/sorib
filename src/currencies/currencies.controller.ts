import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Currencies } from './currencies.interface';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesServices: CurrenciesService) {}

  @Get()
  findAll() {
    return this.currenciesServices.findAll();
  }

  @Post()
  create(@Body() currency: Currencies) {
    return this.currenciesServices.create(currency);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() currency: Currencies) {
    return this.currenciesServices.update({
      ...currency,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.currenciesServices.remove(id);
  }
}
