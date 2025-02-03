import { Injectable, NotFoundException } from '@nestjs/common';
import { SparePartCommandRepository } from '../../infrastructure/repositories/spare-part-command.repository ';
import {
  CreateSparePartCommandDto,
  UpdateSparePartCommandDto,
} from '../dtos/spare-part-command.dto';
import { SparePartCommand } from '../../domain/entities/spare-part-command.entity';

@Injectable()
export class SparePartCommandService {
  constructor(
    private readonly sparePartCommandRepository: SparePartCommandRepository,
  ) {}

  async createSparePartCommand(
    createSparePartCommandDto: CreateSparePartCommandDto,
  ): Promise<SparePartCommand> {
    return this.sparePartCommandRepository.create(createSparePartCommandDto);
  }

  async getSparePartCommandsByCompanyId(
    id: string,
  ): Promise<SparePartCommand[]> {
    return this.sparePartCommandRepository.findByCompanyId(id);
  }

  async getSparePartCommandById(id: number): Promise<SparePartCommand> {
    const user = await this.sparePartCommandRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`SparePartCommand with ID ${id} not found`);
    }
    return user;
  }

  async updateSparePartCommand(
    id: number,
    updateSparePartCommandDto: UpdateSparePartCommandDto,
  ): Promise<void> {
    await this.getSparePartCommandById(id); // Check existence
    await this.sparePartCommandRepository.update(id, updateSparePartCommandDto);
  }

  async deleteSparePartCommand(id: number): Promise<void> {
    await this.getSparePartCommandById(id); // Check existence
    await this.sparePartCommandRepository.delete(id);
  }
}
