import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Moto } from 'src/domain/entities/moto.entity';
import { User } from 'src/domain/entities/user.entity';

export class CreateTestDriveDto {
  @IsString()
  @IsNotEmpty()
  fk_driver: User;

  @IsString()
  @IsNotEmpty()
  fk_moto: Moto;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTestDriveDto extends CreateTestDriveDto {}
