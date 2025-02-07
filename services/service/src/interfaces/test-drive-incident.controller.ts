import { Controller, Post, Param, Body, Patch, Get } from '@nestjs/common';
import {
  CreateTestDriveIncidentDto,
  UpdateTestDriveIncidentDto,
} from '../application/dtos/test-drive-incident.dto';
import { TestDriveIncidentService } from 'src/application/services/test-drive-incident.service';

@Controller('test_drive_incident')
export class TestDriveIncidentController {
  constructor(
    private readonly testDriveIncidentService: TestDriveIncidentService,
  ) {}

  @Get(':id')
  async getTestDrive(@Param('id') id: number) {
    return this.testDriveIncidentService.getTestDriveIncidentById(id);
  }

  @Get('driver/:td_id')
  async getTestDriveByDriver(@Param('td_id') td_id: number) {
    return this.testDriveIncidentService.findByTestDrive(td_id);
  }

  @Post()
  async createTestDrive(
    @Body() createTestDriveIncidentDto: CreateTestDriveIncidentDto,
  ) {
    return this.testDriveIncidentService.create(createTestDriveIncidentDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateTestDriveIncidentDto: UpdateTestDriveIncidentDto,
  ) {
    await this.testDriveIncidentService.update(id, updateTestDriveIncidentDto);
    return { message: `TestDriveIncident with ID ${id} updated successfully` };
  }
}
