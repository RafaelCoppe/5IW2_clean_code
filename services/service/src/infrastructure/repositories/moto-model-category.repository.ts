import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoModelCategory } from 'src/domain/entities/moto-model-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoModelCategoryRepository {
  constructor(
    @InjectRepository(MotoModelCategory)
    private readonly repository: Repository<MotoModelCategory>,
  ) {}

  async create(moto: Partial<MotoModelCategory>): Promise<MotoModelCategory> {
    return this.repository.save(moto);
  }

  async findAll(): Promise<MotoModelCategory[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<MotoModelCategory | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, moto: Partial<MotoModelCategory>): Promise<void> {
    await this.repository.update(id, moto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}