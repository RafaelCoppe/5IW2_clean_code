import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { MotoModel } from 'src/domain/entities/moto-model.entity';
import { Moto } from 'src/domain/entities/moto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoRepository {
  constructor(
    @InjectRepository(Moto)
    private readonly repository: Repository<Moto>,

    @InjectRepository(MotoModel)
    private readonly motoModelRepository: Repository<MotoModel>,
  ) {}

  async create(moto: Partial<Moto>): Promise<Moto> {
    const model = await this.motoModelRepository.findOne({
      where: {
        id: moto.fk_model.id,
      },
      relations: {
        services: true,
      },
    });

    if (!model) {
      throw new Error('Model not found');
    }

    if (model.services.length > 0) {
      const next_service = model.services.find((service) => {
        return service.position === 1;
      });

      if (!next_service) {
        throw new Error('Service not found');
      }

      moto.next_service = next_service;
    } else {
      moto.next_service = null;
    }

    return this.repository.save(moto);
  }

  async findAll(): Promise<Moto[]> {
    return this.repository.find({
      relations: {
        fk_model: true,
        fk_dealer: true,
        fk_owner: true,
        next_service: true,
      },
    });
  }

  async findOne(id: string): Promise<Moto | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        fk_model: true,
        fk_dealer: true,
        fk_owner: true,
        next_service: true,
      },
    });
  }

  async update(id: string, moto: Partial<Moto>): Promise<void> {
    await this.repository.update(id, moto);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
