import { Controller, Get, Param } from '@nestjs/common';
import { SparePartService } from 'src/application/services/spare-part.service';

@Controller('spare_part')
export class SparePartController {
  constructor(private readonly sparePartService: SparePartService) {}

  @Get()
  async getSpareParts() {
    return this.sparePartService.getSpareParts();
  }

  @Get(':id')
  async getSparePartById(@Param('id') id: string) {
    return this.sparePartService.getSparePartById(id);
  }
}
