import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePart } from '../../domain/entities/spare-part.entity';

@Injectable()
export class SparePartRepository {
  constructor(
    @InjectRepository(SparePart)
    private readonly repository: Repository<SparePart>,
  ) {}

  async findAll(): Promise<SparePart[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<SparePart | null> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
