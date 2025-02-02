import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { SparePartController } from 'src/interfaces/spare-part.controller';
import { SparePartRepository } from '../repositories/spare-part.repository';
import { SparePartService } from 'src/application/services/spare-part.service';
import { SparePartCompany } from 'src/domain/entities/spare-part-company.entity';
import { SparePartCompanyController } from 'src/interfaces/spare-part-company.controller';
import { SparePartCompanyRepository } from '../repositories/spare-part-company.repository';
import { SparePartCompanyService } from 'src/application/services/spare-part-company.service';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart, SparePartCompany])],
  controllers: [SparePartController, SparePartCompanyController],
  providers: [
    SparePartRepository,
    SparePartService,
    SparePartCompanyRepository,
    SparePartCompanyService,
  ],
})
export class SparePartModule {}
