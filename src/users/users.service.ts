import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Movements } from 'src/movements/movements.entity';
import { Accounts } from 'src/accounts/accounts.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Movements)
    private movementsRepository: Repository<Movements>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  getMovementsByUser({ filter, page }) {
    const whereClause: any = {
      description: filter.description,
      userId: filter.userId,
      account: {
        id: filter.accountId
      },
      category: {
        id: filter.categoryId
      },
      type: filter.type,
      amount: filter.amount,
    };

    if (filter.fromDate) {
      whereClause.createdAt = MoreThanOrEqual(filter.fromDate);
    }

    if (filter.toDate) {
      whereClause.createdAt = LessThanOrEqual(filter.toDate);
    }
    
    if (filter.fromDate && filter.toDate) {
      whereClause.createdAt = Between(filter.fromDate, filter.toDate);
    }

    return this.movementsRepository.find({
      skip: Number(page.number * page.size),
      take: Number(page.size),
      where: whereClause,
      relations: {
        category: true
      },
    });
  }

  getAccounts(userId: string) {
    return this.accountsRepository.find({
      where: {
        userId,
      },
    });
  }
}
