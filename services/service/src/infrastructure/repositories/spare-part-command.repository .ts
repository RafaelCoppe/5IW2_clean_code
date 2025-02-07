import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePartCommand } from 'src/domain/entities/spare-part-command.entity';

@Injectable()
export class SparePartCommandRepository {
  constructor(
    @InjectRepository(SparePartCommand)
    private readonly repository: Repository<SparePartCommand>,
  ) {}

  async create(command: Partial<SparePartCommand>): Promise<SparePartCommand> {
    return this.repository.save(command);
  }

  async findByCompanyId(id: string): Promise<SparePartCommand[]> {
    return this.repository.find({
      where: {
        fk_company: {
          id,
        },
      },
      relations: {
        fk_spare_part: true,
      },
    });
  }

  async findOne(id: number): Promise<SparePartCommand | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_spare_part: true,
        fk_company: true,
      },
    });
  }

  async update(id: number, command: Partial<SparePartCommand>): Promise<void> {
    await this.repository.update(id, command);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
