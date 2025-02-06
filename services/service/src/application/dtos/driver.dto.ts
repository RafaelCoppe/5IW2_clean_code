import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  fk_user: string;

  @IsNotEmpty()
  @IsNumber()
  fk_status: number;

  @IsString()
  @IsNotEmpty()
  license_link: string;

  @IsString()
  @IsNotEmpty()
  experience: string;
}

export class UpdateDriverDto extends CreateDriverDto {}
