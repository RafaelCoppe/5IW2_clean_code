import { Injectable, NotFoundException } from '@nestjs/common';
import { MotoRepository } from 'src/infrastructure/repositories/moto.repository';
import { CreateMotoDto, UpdateMotoDto } from '../dtos/moto.dto';
import { Moto } from 'src/domain/entities/moto.entity';

@Injectable()
export class MotoService {
  constructor(private readonly motoRepository: MotoRepository) {}

  async createMoto(createMotoDto: CreateMotoDto): Promise<Moto> {
    return this.motoRepository.create(createMotoDto);
  }

  async getMotos(): Promise<Moto[]> {
    return this.motoRepository.findAll();
  }

  async getMotoById(id: string): Promise<Moto> {
    const moto = await this.motoRepository.findOne(id);
    if (!moto) {
      throw new NotFoundException(`Moto with ID ${id} not found`);
    }
    return moto;
  }

  async getMotosByOwner(owner_id: string): Promise<Moto[]> {
    return this.motoRepository.findByOwner(owner_id);
  }

  async getMotosByCompany(company_id: string): Promise<Moto[]> {
    return this.motoRepository.findByCompany(company_id);
  }

  async updateMoto(id: string, updateMotoDto: UpdateMotoDto): Promise<void> {
    await this.getMotoById(id); // Check existence
    await this.motoRepository.update(id, updateMotoDto);
  }

  async deleteMoto(id: string): Promise<void> {
    await this.getMotoById(id); // Check existence
    await this.motoRepository.delete(id);
  }
}
