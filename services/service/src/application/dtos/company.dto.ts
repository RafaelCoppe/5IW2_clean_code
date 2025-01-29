import { IsString, IsNotEmpty, Length } from 'class-validator';
import { CompanyType } from 'src/domain/entities/company-type.entity';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  id: string;

  @IsNotEmpty()
  fk_type: CompanyType;

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
