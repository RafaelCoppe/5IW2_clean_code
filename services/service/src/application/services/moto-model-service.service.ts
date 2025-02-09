import { Injectable } from '@nestjs/common';
import { MotoModelService } from 'src/domain/entities/moto-model-service.entity';
import { MotoModelServiceRepository } from 'src/infrastructure/repositories/moto-model-service.repository';

@Injectable()
export class MotoModelServiceService {
  constructor(
    private readonly motoModelRepository: MotoModelServiceRepository,
  ) {}

  async findByModel(model_id: number): Promise<MotoModelService[]> {
    return this.motoModelRepository.findByModel(model_id);
  }
}
