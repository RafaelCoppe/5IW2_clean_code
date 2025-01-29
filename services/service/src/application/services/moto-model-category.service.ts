import { Injectable, NotFoundException } from '@nestjs/common';
import { MotoModelCategoryRepository } from 'src/infrastructure/repositories/moto-model-category.repository';
import { MotoModelCategory } from 'src/domain/entities/moto-model-category.entity';

@Injectable()
export class MotoModelCategoryService {
  constructor(
    private readonly motoModelCategoryRepository: MotoModelCategoryRepository,
  ) {}

  async getMotoModelCategories(): Promise<MotoModelCategory[]> {
    return this.motoModelCategoryRepository.findAll();
  }

  async getMotoModelCategoryById(id: number): Promise<MotoModelCategory> {
    const motoModel = await this.motoModelCategoryRepository.findOne(id);
    if (!motoModel) {
      throw new NotFoundException(`MotoModelCategory with ID ${id} not found`);
    }
    return motoModel;
  }
}
