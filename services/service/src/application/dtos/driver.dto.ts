import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { DriverStatus } from 'src/domain/entities/driver-status.entity';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  fk_user: string;

  @IsNotEmpty()
  @IsNumber()
  fk_status: DriverStatus;

  @IsString()
  @IsNotEmpty()
  license_link: string;

  @IsString()
  @IsNotEmpty()
  experience: string;
}

export class UpdateDriverDto extends CreateDriverDto {}
