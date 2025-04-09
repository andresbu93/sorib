import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currencies as CurrenciesEntity } from './currencies.entity';
import { Repository } from 'typeorm';
import { Currencies } from './currencies.interface';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(CurrenciesEntity)
    private readonly currenciesRepository: Repository<CurrenciesEntity>,
  ) {}

  findAll() {
    return this.currenciesRepository.find();
  }

  async create(currency: Currencies) {
    const currencyToSave = this.currenciesRepository.create(currency);
    return await this.currenciesRepository.save(currencyToSave);
  }

  async update(currency: Currencies) {
    const currencyToUpdate = await this.currenciesRepository.findOneBy({
      id: currency.id,
    });
    return await this.currenciesRepository.update(currency.id, {
      ...currencyToUpdate,
      ...currency,
    });
  }

  remove(id: number) {
    return this.currenciesRepository.delete({ id });
  }
}
