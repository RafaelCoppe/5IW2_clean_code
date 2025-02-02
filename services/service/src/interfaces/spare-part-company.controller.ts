import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SparePartCompanyService } from 'src/application/services/spare-part-company.service';

@Controller('spare_part_company')
export class SparePartCompanyController {
  constructor(private readonly sparePartService: SparePartCompanyService) {}

  @Get(':id')
  async getSparePartCompany(@Param('id') id: string) {
    return this.sparePartService.getSparePartsCompany(id);
  }

  @Patch(':id')
  async updateStock(@Param('id') id: string, @Body() body: { stock: number }) {
    return this.sparePartService.updateStock(id, body.stock);
  }
}
