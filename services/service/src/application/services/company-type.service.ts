import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyTypeRepository } from '../../infrastructure/repositories/company-type.repository';
import { CompanyType } from '../../domain/entities/company-type.entity';

@Injectable()
export class CompanyTypeService {
  constructor(private readonly companyTypeRepository: CompanyTypeRepository) {}

  async createCompanyType(companyType: CompanyType): Promise<CompanyType> {
    return this.companyTypeRepository.create(companyType);
  }

  async getCompanyTypes(): Promise<CompanyType[]> {
    return this.companyTypeRepository.findAll();
  }

  async getCompanyTypeById(id: number): Promise<CompanyType> {
    const company_type = await this.companyTypeRepository.findOne(id);
    if (!company_type) {
      throw new NotFoundException(`Company type with ID ${id} not found`);
    }
    return company_type;
  }
}
