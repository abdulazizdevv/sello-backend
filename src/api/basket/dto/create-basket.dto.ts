import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBasketDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
