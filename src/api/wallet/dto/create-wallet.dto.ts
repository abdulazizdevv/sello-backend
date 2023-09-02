import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  payment_id: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
