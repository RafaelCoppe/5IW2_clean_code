import { Controller, Post, Param, Body, Patch } from '@nestjs/common';
import { DriverService } from '../application/services/driver.service';
import {
  CreateDriverDto,
  UpdateDriverDto,
} from '../application/dtos/driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async createUser(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.createUser(createDriverDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    await this.driverService.updateUser(id, updateDriverDto);
    return { message: `Driver with ID ${id} updated successfully` };
  }
}
