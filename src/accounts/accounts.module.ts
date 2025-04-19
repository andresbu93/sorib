import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts.entity';
import { MovementsModule } from 'src/movements/movements.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts]),
    forwardRef(() => MovementsModule),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
