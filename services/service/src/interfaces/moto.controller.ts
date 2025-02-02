import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MotoService } from '../application/services/moto.service';
import { CreateMotoDto, UpdateMotoDto } from '../application/dtos/moto.dto';

@Controller('moto')
export class MotoController {
  constructor(private readonly motoService: MotoService) {}

  @Post()
  async createMoto(@Body() createMotoDto: CreateMotoDto) {
    return this.motoService.createMoto(createMotoDto);
  }

  @Get()
  async getMotos() {
    return this.motoService.getMotos();
  }

  @Get(':id')
  async getMotoById(@Param('id') id: string) {
    return this.motoService.getMotoById(id);
  }

  @Patch(':id')
  async updateMoto(
    @Param('id') id: string,
    @Body() updateMotoDto: UpdateMotoDto,
  ) {
    await this.motoService.updateMoto(id, updateMotoDto);
    return { message: `Moto with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteMoto(@Param('id') id: string) {
    await this.motoService.deleteMoto(id);
    return { message: `Moto with ID ${id} deleted successfully` };
  }
}
