import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyType } from '../../domain/entities/company-type.entity';

@Injectable()
export class CompanyTypeRepository {
  constructor(
    @InjectRepository(CompanyType)
    private readonly repository: Repository<CompanyType>,
  ) {}

  async findAll(): Promise<CompanyType[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CompanyType | null> {
    return this.repository.findOne({ where: { id } });
  }
}
