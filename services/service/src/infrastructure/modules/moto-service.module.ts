import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoServiceController } from 'src/interfaces/moto-service.controller';
import { MotoServiceRepository } from '../repositories/moto-service.repository';
import { MotoServiceService } from 'src/application/services/moto-service.service';
import { MotoService } from 'src/domain/entities/moto-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotoService])],
  controllers: [MotoServiceController],
  providers: [MotoServiceRepository, MotoServiceService],
})
export class MotoServiceModule {}
