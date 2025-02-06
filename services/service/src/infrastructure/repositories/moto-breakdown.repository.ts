import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoBreakdown } from 'src/domain/entities/moto-breakdown.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MotoBreakdownRepository {
  constructor(
    @InjectRepository(MotoBreakdown)
    private readonly repository: Repository<MotoBreakdown>,

    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,
  ) {}

  async create(breakdown: Partial<MotoBreakdown>): Promise<MotoBreakdown> {
    const spareParts = await this.sparePartRepository.findBy({
      id: In([...breakdown.fk_parts]),
    });

    breakdown.fk_parts = spareParts;

    return this.repository.save(breakdown);
  }

  async findByMoto(): Promise<MotoBreakdown[]> {
    return this.repository.find({
      relations: {
        fk_moto: true,
        fk_parts: true,
      },
    });
  }

  async findOne(id: number): Promise<MotoBreakdown | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_moto: true,
        fk_parts: true,
      },
    });
  }

  async update(id: number, breakdown: Partial<MotoBreakdown>): Promise<void> {
    const spareParts = await this.sparePartRepository.findBy({
      id: In([...breakdown.fk_parts]),
    });

    breakdown.fk_parts = spareParts;

    await this.repository.update(id, breakdown);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
