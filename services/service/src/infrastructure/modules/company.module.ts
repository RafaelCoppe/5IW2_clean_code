import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from 'src/interfaces/company.controller';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from 'src/domain/entities/company.entity';
import { CompanyService } from 'src/application/services/company.service';
import { CompanyType } from 'src/domain/entities/company-type.entity';
import { CompanyTypeService } from 'src/application/services/company-type.service';
import { CompanyTypeController } from 'src/interfaces/company-type.controller ';
import { CompanyTypeRepository } from '../repositories/company-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType])],
  controllers: [CompanyController, CompanyTypeController],
  providers: [
    CompanyRepository,
    CompanyService,
    CompanyTypeRepository,
    CompanyTypeService,
  ],
})
export class CompanyModule {}
