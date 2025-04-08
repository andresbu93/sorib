import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { Movements } from 'src/movements/movements.entity';
import { Accounts } from 'src/accounts/accounts.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<Users>,
    @InjectRepository(Movements)
    private movementsRepository: Repository<Movements>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  getMovementsByUser({ filter, page }) {
    console.log(filter, page);
    return this.movementsRepository.find({
      skip: Number(page.number * page.size),
      take: Number(page.size),
      where: {
        description: filter.description,
        user: {
          id: filter.userId,
        },
      },
    });
  }

  getAccounts(userId: number) {
    return this.accountsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
