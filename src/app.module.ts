import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from './movements/movements.entity';
import { FilesModule } from './files/files.module';
import { MovementsModule } from './movements/movements.module';
import { CategoriesModule } from './concepts/categories.module';

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
        entities: [Movements],
        synchronize: true,
      }),
    }),
    FilesModule,
    MovementsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
