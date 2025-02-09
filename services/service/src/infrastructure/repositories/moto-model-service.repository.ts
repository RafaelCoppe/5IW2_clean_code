import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoModelService } from 'src/domain/entities/moto-model-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoModelServiceRepository {
  constructor(
    @InjectRepository(MotoModelService)
    private readonly repository: Repository<MotoModelService>,
  ) {}

  async findByModel(model_id: number): Promise<MotoModelService[]> {
    return this.repository.find({
      where: {
        fk_model: {
          id: model_id,
        },
      },
    });
  }
}
