import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { SparePartController } from 'src/interfaces/spare-part.controller';
import { SparePartRepository } from '../repositories/spare-part.repository';
import { SparePartService } from 'src/application/services/spare-part.service';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  controllers: [SparePartController],
  providers: [SparePartRepository, SparePartService],
})
export class SparePartModule {}
