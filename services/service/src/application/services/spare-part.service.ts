import { Injectable, NotFoundException } from '@nestjs/common';
import { SparePart } from 'src/domain/entities/spare-part.entity';
import { SparePartRepository } from 'src/infrastructure/repositories/spare-part.repository';

@Injectable()
export class SparePartService {
  constructor(private readonly sparePartRepository: SparePartRepository) {}

  async getSpareParts(): Promise<SparePart[]> {
    return this.sparePartRepository.findAll();
  }

  async getSparePartById(id: number): Promise<SparePart> {
    const spare_part = await this.sparePartRepository.findOne(id);
    if (!spare_part) {
      throw new NotFoundException(`SparePart with ID ${id} not found`);
    }
    return spare_part;
  }
}
