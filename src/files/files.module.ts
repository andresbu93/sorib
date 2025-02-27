import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MovementsModule } from 'src/movements/movements.module';
import { CategoriesModule } from 'src/concepts/categories.module';

@Module({
  imports: [MovementsModule, CategoriesModule],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
