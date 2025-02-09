import { Controller, Get, Param } from '@nestjs/common';
import { MotoModelServiceService } from 'src/application/services/moto-model-service.service';

@Controller('moto_model_service')
export class MotoModelServiceController {
  constructor(
    private readonly motoModelServiceService: MotoModelServiceService,
  ) {}

  @Get(':id')
  async findByModel(@Param('id') id: number) {
    return this.motoModelServiceService.findByModel(id);
  }
}
