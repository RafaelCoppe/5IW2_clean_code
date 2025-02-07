import { Controller, Get, Param } from '@nestjs/common';
import { CompanyTypeService } from 'src/application/services/company-type.service';

@Controller('company_type')
export class CompanyTypeController {
  constructor(private readonly companyTypeService: CompanyTypeService) {}

  @Get()
  async getCompanyTypes() {
    return this.companyTypeService.getCompanyTypes();
  }

  @Get(':id')
  async getCompanyTypeById(@Param('id') id: number) {
    return this.companyTypeService.getCompanyTypeById(id);
  }
}
