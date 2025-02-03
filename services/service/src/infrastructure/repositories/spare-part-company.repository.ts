import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePartCompany } from '../../domain/entities/spare-part-company.entity';

@Injectable()
export class SparePartCompanyRepository {
  constructor(
    @InjectRepository(SparePartCompany)
    private readonly repository: Repository<SparePartCompany>,
  ) {}

  async findByCompanyId(id: string): Promise<SparePartCompany[]> {
    return this.repository.find({
      where: {
        fk_company: {
          id,
        },
      },
      relations: {
        fk_part: true,
      },
    });
  }

  async updateStock(id: string, stock: number): Promise<void> {
    await this.repository.update(id, {
      stock: stock,
    });
  }
}
