import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTypeController } from 'src/interfaces/company-type.controller ';
import { CompanyTypeRepository } from '../repositories/company-type.repository';
import { CompanyType } from 'src/domain/entities/company-type.entity';
import { CompanyTypeService } from 'src/application/services/company-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyType])],
  controllers: [CompanyTypeController],
  providers: [CompanyTypeRepository, CompanyTypeService],
})
export class CompanyTypeModule {}
