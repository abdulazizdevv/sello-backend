import { PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  birth_day: string;
}
