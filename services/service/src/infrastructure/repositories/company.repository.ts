import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async create(company: Partial<Company>): Promise<Company> {
    return this.repository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.repository.find({
      relations: {
        fk_type: true,
        motos: true,
      },
    });
  }

  async findOne(id: string): Promise<Company | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_type: true,
        motos: true,
      },
    });
  }

  async update(id: string, company: Partial<Company>): Promise<void> {
    await this.repository.update(id, company);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
