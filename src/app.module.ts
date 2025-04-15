import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from './movements/movements.entity';
import { MovementsModule } from './movements/movements.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { Accounts } from './accounts/accounts.entity';
import { Categories } from './categories/categories.entity';
import { CurrenciesModule } from './currencies/currencies.module';
import { Currencies } from './currencies/currencies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Movements, Accounts, Categories, Currencies],
        synchronize: true,
      }),
    }),
    // FilesModule,
    MovementsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    CurrenciesModule,
  ],
})
export class AppModule {}
