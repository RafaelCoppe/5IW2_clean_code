import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from 'src/interfaces/company.controller';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from 'src/domain/entities/company.entity';
import { CompanyService } from 'src/application/services/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyRepository, CompanyService],
})
export class CompanyModule {}
