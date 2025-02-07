import { Injectable, NotFoundException } from '@nestjs/common';
import { MotoModelRepository } from 'src/infrastructure/repositories/moto-model.repository';
import { CreateMotoModelDto } from '../dtos/moto-model.dto';
import { MotoModel } from 'src/domain/entities/moto-model.entity';

@Injectable()
export class MotoModelService {
  constructor(private readonly motoModelRepository: MotoModelRepository) {}

  async createMotoModel(
    createMotoModelDto: CreateMotoModelDto,
  ): Promise<MotoModel> {
    return this.motoModelRepository.create(createMotoModelDto);
  }

  async getMotoModels(): Promise<MotoModel[]> {
    return this.motoModelRepository.findAll();
  }

  async getMotoModelById(id: number): Promise<MotoModel> {
    const motoModel = await this.motoModelRepository.findOne(id);
    if (!motoModel) {
      throw new NotFoundException(`MotoModel with ID ${id} not found`);
    }
    return motoModel;
  }

  async updateMotoModel(
    id: number,
    updateMotoModelDto: CreateMotoModelDto,
  ): Promise<void> {
    await this.getMotoModelById(id); // Check existence
    await this.motoModelRepository.update(id, updateMotoModelDto);
  }

  async deleteMotoModel(id: number): Promise<void> {
    await this.getMotoModelById(id); // Check existence
    await this.motoModelRepository.delete(id);
  }
}
