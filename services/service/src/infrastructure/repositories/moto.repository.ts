import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moto } from 'src/domain/entities/moto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotoRepository {
  constructor(
    @InjectRepository(Moto)
    private readonly repository: Repository<Moto>,
  ) {}

  async create(moto: Partial<Moto>): Promise<Moto> {
    return this.repository.save(moto);
  }

  async findAll(): Promise<Moto[]> {
    return this.repository.find({
      relations: {
        fk_model: true,
        fk_dealer: true,
        fk_owner: true,
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