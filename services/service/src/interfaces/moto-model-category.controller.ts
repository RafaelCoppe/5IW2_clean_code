import { Controller, Get, Param } from '@nestjs/common';
import { MotoModelCategoryService } from '../application/services/moto-model-category.service';

@Controller('moto_model_category')
export class MotoModelCategoryController {
  constructor(
    private readonly motoModelCategoryService: MotoModelCategoryService,
  ) {}

  @Get()
  async getMotoModels() {
    return this.motoModelCategoryService.getMotoModelCategories();
  }

  @Get(':id')
  async getMotoModelById(@Param('id') id: number) {
    return this.motoModelCategoryService.getMotoModelCategoryById(id);
  }
}
