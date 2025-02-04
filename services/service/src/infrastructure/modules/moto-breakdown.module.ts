import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoBreakdownController } from 'src/interfaces/moto-breakdown.controller';
import { MotoBreakdownRepository } from '../repositories/moto-breakdown.repository';
import { MotoBreakdownService } from 'src/application/services/moto-breakdown.service';
import { MotoBreakdown } from 'src/domain/entities/moto-breakdown.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotoBreakdown])],
  controllers: [MotoBreakdownController],
  providers: [MotoBreakdownRepository, MotoBreakdownService],
})
export class MotoBreakdownModule {}
