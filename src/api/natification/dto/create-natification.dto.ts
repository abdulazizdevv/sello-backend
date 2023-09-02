import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNatificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
