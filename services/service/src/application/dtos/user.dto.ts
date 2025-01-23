import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  phone: string;
}

export class UpdateUserDto extends CreateUserDto {}
