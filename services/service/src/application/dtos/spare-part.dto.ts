import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSparePartDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  label: string;

  @IsString()
  @IsNotEmpty()
  picture_link: string;
}

export class UpdateSparePartDto extends CreateSparePartDto {}
