import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
