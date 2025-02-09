import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoServiceController } from 'src/interfaces/moto-service.controller';
import { MotoServiceRepository } from '../repositories/moto-service.repository';
import { MotoServiceService } from 'src/application/services/moto-service.service';
import { MotoService } from 'src/domain/entities/moto-service.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { MotoModelService } from 'src/domain/entities/moto-model-service.entity';
import { MotoModelServiceController } from 'src/interfaces/moto-model-service.controller';
import { MotoModelServiceRepository } from '../repositories/moto-model-service.repository';
import { MotoModelServiceService } from 'src/application/services/moto-model-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotoService, MotoModelService, SparePart]),
  ],
  controllers: [MotoServiceController, MotoModelServiceController],
  providers: [
    MotoServiceRepository,
    MotoServiceService,
    MotoModelServiceRepository,
    MotoModelServiceService,
  ],
})
export class MotoServiceModule {}
