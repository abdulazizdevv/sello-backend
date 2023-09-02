import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}

export class RegisterVerifyAuthDto {
  @IsNumber()
  @IsOptional()
  verifycode: number;
}
