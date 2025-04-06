import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from './movements.entity';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AccountsService } from 'src/accounts/accounts.service';
import { Accounts } from 'src/accounts/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movements, Accounts]), AccountsModule],
  providers: [MovementsService, AccountsService],
  exports: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
