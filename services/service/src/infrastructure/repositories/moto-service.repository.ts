import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoService } from 'src/domain/entities/moto-service.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MotoServiceRepository {
  constructor(
    @InjectRepository(MotoService)
    private readonly repository: Repository<MotoService>,

    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,
  ) {}

  async create(service: Partial<MotoService>): Promise<MotoService> {
    const spareParts = await this.sparePartRepository.findBy({
      id: In([...service.fk_parts]),
    });

    service.fk_parts = spareParts;

    return this.repository.save(service);
  }

  async findByMoto(): Promise<MotoService[]> {
    return this.repository.find({
      relations: {
        fk_moto: true,
        fk_parts: true,
      },
    });
  }

  async findOne(id: number): Promise<MotoService | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_moto: true,
        fk_parts: true,
      },
    });
  }

  async update(id: number, service: Partial<MotoService>): Promise<void> {
    const spareParts = await this.sparePartRepository.findBy({
      id: In([...service.fk_parts]),
    });

    service.fk_parts = spareParts;

    await this.repository.update(id, service);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
