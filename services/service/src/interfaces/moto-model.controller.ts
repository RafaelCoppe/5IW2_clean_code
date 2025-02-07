import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { MotoModelService } from '../application/services/moto-model.service';
import {
  CreateMotoModelDto,
  UpdateMotoModelDto,
} from '../application/dtos/moto-model.dto';

@Controller('moto_model')
export class MotoModelController {
  constructor(private readonly motoModelService: MotoModelService) {}

  @Post()
  async createMotoModel(@Body() createMotoModelDto: CreateMotoModelDto) {
    return this.motoModelService.createMotoModel(createMotoModelDto);
  }

  @Get()
  async getMotoModels() {
    return this.motoModelService.getMotoModels();
  }

  @Get(':id')
  async getMotoModelById(@Param('id') id: number) {
    return this.motoModelService.getMotoModelById(id);
  }

  @Patch(':id')
  async updateMotoModel(
    @Param('id') id: number,
    @Body() updateMotoModelDto: UpdateMotoModelDto,
  ) {
    await this.motoModelService.updateMotoModel(id, updateMotoModelDto);
    return { message: `MotoModel with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteMotoModel(@Param('id') id: number) {
    await this.motoModelService.deleteMotoModel(id);
    return { message: `MotoModel with ID ${id} deleted successfully` };
  }
}
