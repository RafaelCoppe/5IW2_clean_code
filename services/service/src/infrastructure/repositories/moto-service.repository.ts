import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoService } from 'src/domain/entities/moto-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoServiceRepository {
  constructor(
    @InjectRepository(MotoService)
    private readonly repository: Repository<MotoService>,
  ) {}

  async create(moto: Partial<MotoService>): Promise<MotoService> {
    return this.repository.save(moto);
  }

  async findByMoto(): Promise<MotoService[]> {
    return this.repository.find({
      relations: {
        fk_moto: true,
      },
    });
  }

  async findOne(id: number): Promise<MotoService | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_moto: true,
      },
    });
  }

  async update(id: number, moto: Partial<MotoService>): Promise<void> {
    await this.repository.update(id, moto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}