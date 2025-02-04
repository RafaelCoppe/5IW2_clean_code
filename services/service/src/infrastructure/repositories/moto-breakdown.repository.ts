import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoBreakdown } from 'src/domain/entities/moto-breakdown.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoBreakdownRepository {
  constructor(
    @InjectRepository(MotoBreakdown)
    private readonly repository: Repository<MotoBreakdown>,
  ) {}

  async create(moto: Partial<MotoBreakdown>): Promise<MotoBreakdown> {
    return this.repository.save(moto);
  }

  async findByMoto(): Promise<MotoBreakdown[]> {
    return this.repository.find({
      relations: {
        fk_moto: true,
      },
    });
  }

  async findOne(id: number): Promise<MotoBreakdown | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_moto: true,
      },
    });
  }

  async update(id: number, moto: Partial<MotoBreakdown>): Promise<void> {
    await this.repository.update(id, moto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}