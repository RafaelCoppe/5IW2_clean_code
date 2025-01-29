import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoModel } from 'src/domain/entities/moto-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoModelRepository {
  constructor(
    @InjectRepository(MotoModel)
    private readonly repository: Repository<MotoModel>
  ) {}

  async create(moto: Partial<MotoModel>): Promise<MotoModel> {
    return this.repository.save(moto);
  }

  async findAll(): Promise<MotoModel[]> {
    return this.repository.find({
      relations: {
        fk_category: true,
      },
    });
  }

  async findOne(id: number): Promise<MotoModel | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_category: true,
      },
    });
  }

  async update(id: number, moto: Partial<MotoModel>): Promise<void> {
    await this.repository.update(id, moto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}