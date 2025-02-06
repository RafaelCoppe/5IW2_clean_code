import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoBreakdownController } from 'src/interfaces/moto-breakdown.controller';
import { MotoBreakdownRepository } from '../repositories/moto-breakdown.repository';
import { MotoBreakdownService } from 'src/application/services/moto-breakdown.service';
import { MotoBreakdown } from 'src/domain/entities/moto-breakdown.entity';
import { SparePart } from 'src/domain/entities/spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotoBreakdown, SparePart])],
  controllers: [MotoBreakdownController],
  providers: [MotoBreakdownRepository, MotoBreakdownService],
})
export class MotoBreakdownModule {}
