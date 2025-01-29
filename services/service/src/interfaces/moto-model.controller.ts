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
  async createMotoModel(@Body() createUserDto: CreateMotoModelDto) {
    return this.motoModelService.createMotoModel(createUserDto);
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
    @Body() updateUserDto: UpdateMotoModelDto,
  ) {
    await this.motoModelService.updateMotoModel(id, updateUserDto);
    return { message: `MotoModel with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteMotoModel(@Param('id') id: number) {
    await this.motoModelService.deleteMotoModel(id);
    return { message: `MotoModel with ID ${id} deleted successfully` };
  }
}
