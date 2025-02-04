import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  CreateMotoBreakdownDto,
  UpdateMotoBreakdownDto,
} from 'src/application/dtos/moto-breakdown.dto';
import { MotoBreakdownService } from 'src/application/services/moto-breakdown.service';

@Controller('moto_breakdown')
export class MotoBreakdownController {
  constructor(private readonly motoServiceService: MotoBreakdownService) {}

  @Post()
  async createMotoBreakdown(
    @Body() createMotoBreakdownDto: CreateMotoBreakdownDto,
  ) {
    return this.motoServiceService.createMotoBreakdown(createMotoBreakdownDto);
  }

  @Get('moto/:id')
  async getMotos() {
    return this.motoServiceService.getMotosServiceByMoto();
  }

  @Get(':id')
  async getMotoById(@Param('id') id: number) {
    return this.motoServiceService.getMotoBreakdownById(id);
  }

  @Patch(':id')
  async updateMoto(
    @Param('id') id: number,
    @Body() updateMotoDto: UpdateMotoBreakdownDto,
  ) {
    await this.motoServiceService.updateMotoBreakdown(id, updateMotoDto);
    return { message: `MotoBreakdown with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteMoto(@Param('id') id: number) {
    await this.motoServiceService.deleteMotoBreakdown(id);
    return { message: `MotoBreakdown with ID ${id} deleted successfully` };
  }
}
