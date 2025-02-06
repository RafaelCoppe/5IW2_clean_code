import { Injectable, NotFoundException } from '@nestjs/common';
import { MotoServiceRepository } from 'src/infrastructure/repositories/moto-service.repository';
import {
  CreateMotoServiceDto,
  UpdateMotoServiceDto,
} from '../dtos/moto-service.dto';
import { MotoService } from 'src/domain/entities/moto-service.entity';

@Injectable()
export class MotoServiceService {
  constructor(private readonly motoServiceRepository: MotoServiceRepository) {}

  async createMotoService(
    createMotoServiceDto: CreateMotoServiceDto,
  ): Promise<MotoService> {
    return this.motoServiceRepository.create(createMotoServiceDto);
  }

  async getMotosServiceByMoto(): Promise<MotoService[]> {
    return this.motoServiceRepository.findByMoto();
  }

  async getMotoServiceById(id: number): Promise<MotoService> {
    const motoService = await this.motoServiceRepository.findOne(id);
    if (!motoService) {
      throw new NotFoundException(`MotoService with ID ${id} not found`);
    }
    return motoService;
  }

  async updateMotoService(
    id: number,
    updateMotoServiceDto: UpdateMotoServiceDto,
  ): Promise<void> {
    await this.getMotoServiceById(id); // Check existence
    await this.motoServiceRepository.update(id, updateMotoServiceDto);
  }

  async deleteMotoService(id: number): Promise<void> {
    await this.getMotoServiceById(id); // Check existence
    await this.motoServiceRepository.delete(id);
  }
}
