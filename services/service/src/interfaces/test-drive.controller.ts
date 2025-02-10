import { Controller, Post, Param, Body, Patch, Get } from '@nestjs/common';
import { TestDriveService } from '../application/services/test-drive.service';
import {
  CreateTestDriveDto,
  UpdateTestDriveDto,
} from '../application/dtos/test-drive.dto';

@Controller('test_drive')
export class TestDriveController {
  constructor(private readonly testDriveService: TestDriveService) {}

  @Get()
  async getAllTestDrives() {
    return this.testDriveService.getAllTestDrives();
  }

  @Get(':id')
  async getTestDrive(@Param('id') id: number) {
    return this.testDriveService.getTestDriveById(id);
  }

  @Get('driver/:driver_id')
  async getTestDriveByDriver(@Param('driver_id') driver_id: string) {
    return this.testDriveService.findByDriver(driver_id);
  }

  @Get('moto/:moto_id')
  async getTestDriveByMoto(@Param('moto_id') moto_id: string) {
    return this.testDriveService.findByMoto(moto_id);
  }

  @Get('company/:company_id')
  async getTestDriveByCompany(@Param('company_id') company_id: string) {
    return this.testDriveService.findByCompany(company_id);
  }

  @Post()
  async createTestDrive(@Body() createDriverDto: CreateTestDriveDto) {
    return this.testDriveService.create(createDriverDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateDriverDto: UpdateTestDriveDto,
  ) {
    await this.testDriveService.update(id, updateDriverDto);
    return { message: `TestDrive with ID ${id} updated successfully` };
  }
}
