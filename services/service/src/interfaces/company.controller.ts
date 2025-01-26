import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompanyService } from '../application/services/company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
} from 'src/application/dtos/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createUser(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async getUsers() {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Patch(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.companyService.updateCompany(id, updateCompanyDto);
    return { message: `Company with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    await this.companyService.deleteCompany(id);
    return { message: `Company with ID ${id} deleted successfully` };
  }
}
