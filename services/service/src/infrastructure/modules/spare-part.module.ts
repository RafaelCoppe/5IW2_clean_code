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
import { SparePartCommand } from 'src/domain/entities/spare-part-command.entity';
import { SparePartCommandController } from 'src/interfaces/spare-part-command.controller';
import { SparePartCommandRepository } from '../repositories/spare-part-command.repository ';
import { SparePartCommandService } from 'src/application/services/spare-part-command.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SparePart, SparePartCompany, SparePartCommand]),
  ],
  controllers: [
    SparePartController,
    SparePartCompanyController,
    SparePartCommandController,
  ],
  providers: [
    SparePartRepository,
    SparePartService,
    SparePartCompanyRepository,
    SparePartCompanyService,
    SparePartCommandRepository,
    SparePartCommandService,
  ],
})
export class SparePartModule {}
