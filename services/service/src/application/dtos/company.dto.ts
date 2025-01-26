import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  id: string;

  @IsNumber()
  @IsNotEmpty()
  type_id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  number: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  citycode: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  mail: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  contact_first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  contact_last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  contact_mail: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  contact_phone: string;
}

export class UpdateCompanyDto extends CreateCompanyDto {}
