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
  CreateMotoServiceDto,
  UpdateMotoServiceDto,
} from 'src/application/dtos/moto-service.dto';
import { MotoServiceService } from 'src/application/services/moto-service.service';

@Controller('moto_service')
export class MotoServiceController {
  constructor(private readonly motoServiceService: MotoServiceService) {}

  @Post()
  async createMotoService(@Body() createMotoServiceDto: CreateMotoServiceDto) {
    return this.motoServiceService.createMotoService(createMotoServiceDto);
  }

  @Get('moto/:id')
  async getMotos() {
    return this.motoServiceService.getMotosServiceByMoto();
  }

  @Get(':id')
  async getMotoById(@Param('id') id: number) {
    return this.motoServiceService.getMotoServiceById(id);
  }

  @Patch(':id')
  async updateMoto(
    @Param('id') id: number,
    @Body() updateMotoDto: UpdateMotoServiceDto,
  ) {
    await this.motoServiceService.updateMotoService(id, updateMotoDto);
    return { message: `MotoService with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteMoto(@Param('id') id: number) {
    await this.motoServiceService.deleteMotoService(id);
    return { message: `MotoService with ID ${id} deleted successfully` };
  }
}
