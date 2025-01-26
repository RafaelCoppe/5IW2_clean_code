import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../../infrastructure/repositories/company.repository';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
import { Company } from '../../domain/entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createCompany(CreateCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.create(CreateCompanyDto);
  }

  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }

  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne(id);
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<void> {
    await this.getCompanyById(id); // Check existence
    await this.companyRepository.update(id, updateCompanyDto);
  }

  async deleteCompany(id: string): Promise<void> {
    await this.getCompanyById(id); // Check existence
    await this.companyRepository.delete(id);
  }
}
