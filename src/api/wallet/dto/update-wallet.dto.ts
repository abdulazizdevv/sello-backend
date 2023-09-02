import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @IsNumber()
    @IsNotEmpty()
    amount: number;
  
    @IsString()
    @IsNotEmpty()
    payment_id: string;
}
