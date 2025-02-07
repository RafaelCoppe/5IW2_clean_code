import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoController } from 'src/interfaces/moto.controller';
import { MotoRepository } from '../repositories/moto.repository';
import { MotoService } from 'src/application/services/moto.service';
import { Moto } from 'src/domain/entities/moto.entity';
import { MotoModel } from 'src/domain/entities/moto-model.entity';
import { MotoModelCategory } from 'src/domain/entities/moto-model-category.entity';
import { MotoModelRepository } from '../repositories/moto-model.repository';
import { MotoModelService } from 'src/application/services/moto-model.service';
import { MotoModelController } from 'src/interfaces/moto-model.controller';
import { MotoModelCategoryRepository } from '../repositories/moto-model-category.repository';
import { MotoModelCategoryService } from 'src/application/services/moto-model-category.service';
import { MotoModelCategoryController } from 'src/interfaces/moto-model-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Moto, MotoModel, MotoModelCategory])],
  controllers: [
    MotoController,
    MotoModelController,
    MotoModelCategoryController,
  ],
  providers: [
    MotoRepository,
    MotoService,
    MotoModelRepository,
    MotoModelService,
    MotoModelCategoryRepository,
    MotoModelCategoryService,
  ],
})
export class MotoModule {}
