import { Injectable, NotFoundException } from '@nestjs/common';
import { MotoBreakdownRepository } from 'src/infrastructure/repositories/moto-breakdown.repository';
import {
  CreateMotoBreakdownDto,
  UpdateMotoBreakdownDto,
} from '../dtos/moto-breakdown.dto';
import { MotoBreakdown } from 'src/domain/entities/moto-breakdown.entity';

@Injectable()
export class MotoBreakdownService {
  constructor(
    private readonly motoBreakdownRepository: MotoBreakdownRepository,
  ) {}

  async createMotoBreakdown(
    createMotoBreakdownDto: CreateMotoBreakdownDto,
  ): Promise<MotoBreakdown> {
    return this.motoBreakdownRepository.create(createMotoBreakdownDto);
  }

  async getMotosServiceByMoto(): Promise<MotoBreakdown[]> {
    return this.motoBreakdownRepository.findByMoto();
  }

  async getMotoBreakdownById(id: number): Promise<MotoBreakdown> {
    const motoService = await this.motoBreakdownRepository.findOne(id);
    if (!motoService) {
      throw new NotFoundException(`MotoBreakdown with ID ${id} not found`);
    }
    return motoService;
  }

  async updateMotoBreakdown(
    id: number,
    updateMotoBreakdownDto: UpdateMotoBreakdownDto,
  ): Promise<void> {
    await this.getMotoBreakdownById(id); // Check existence
    await this.motoBreakdownRepository.update(id, updateMotoBreakdownDto);
  }

  async deleteMotoBreakdown(id: number): Promise<void> {
    await this.getMotoBreakdownById(id); // Check existence
    await this.motoBreakdownRepository.delete(id);
  }
}
