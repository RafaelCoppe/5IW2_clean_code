import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { SparePartCommandService } from '../application/services/spare-part-command.service';
import {
  CreateSparePartCommandDto,
  UpdateSparePartCommandDto,
} from '../application/dtos/spare-part-command.dto';

@Controller('spare_part_command')
export class SparePartCommandController {
  constructor(private readonly userService: SparePartCommandService) {}

  @Post()
  async createSparePartCommand(
    @Body() createSparePartCommandDto: CreateSparePartCommandDto,
  ) {
    return this.userService.createSparePartCommand(createSparePartCommandDto);
  }

  @Get('company/:id')
  async getSparePartCommandsByCompanyId(@Param('id') id: string) {
    return this.userService.getSparePartCommandsByCompanyId(id);
  }

  @Get(':id')
  async getSparePartCommandById(@Param('id') id: number) {
    return this.userService.getSparePartCommandById(id);
  }

  @Patch(':id')
  async updateSparePartCommand(
    @Param('id') id: number,
    @Body() updateSparePartCommandDto: UpdateSparePartCommandDto,
  ) {
    await this.userService.updateSparePartCommand(
      id,
      updateSparePartCommandDto,
    );
    return { message: `SparePartCommand with ID ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteSparePartCommand(@Param('id') id: number) {
    await this.userService.deleteSparePartCommand(id);
    return { message: `SparePartCommand with ID ${id} deleted successfully` };
  }
}
