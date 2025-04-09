import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesServices.findAll();
  }

  @Post()
  create(@Body() category: Categories) {
    return this.categoriesServices.create(category);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() category: Categories) {
    return this.categoriesServices.update({
      ...category,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesServices.remove(id);
  }
}
