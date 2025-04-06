import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Movements } from 'src/movements/movements.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Post()
  categoriesByDescriptions(@Body() movement: Partial<Movements>) {
    return this.categoriesServices.getCategory(movement);
  }
}
