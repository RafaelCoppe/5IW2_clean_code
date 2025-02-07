import { IsNotEmpty, IsString } from 'class-validator';
import { MotoModelCategory } from 'src/domain/entities/moto-model-category.entity';

export class CreateMotoModelDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  fk_category: MotoModelCategory;
}

export class UpdateMotoModelDto extends CreateMotoModelDto {}
