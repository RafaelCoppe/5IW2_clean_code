import { Injectable } from '@nestjs/common';
import { SparePartCompany } from 'src/domain/entities/spare-part-company.entity';
import { SparePartCompanyRepository } from 'src/infrastructure/repositories/spare-part-company.repository';

@Injectable()
export class SparePartCompanyService {
  constructor(
    private readonly sparePartCompanyRepository: SparePartCompanyRepository,
  ) {}

  async getSparePartsCompany(company_id: string): Promise<SparePartCompany[]> {
    return this.sparePartCompanyRepository.findByCompanyId(company_id);
  }

  async updateStock(id: string, stock: number): Promise<void> {
    return this.sparePartCompanyRepository.updateStock(id, stock);
  }
}
