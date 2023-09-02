import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
