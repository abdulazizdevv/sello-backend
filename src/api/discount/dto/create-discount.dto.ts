import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
