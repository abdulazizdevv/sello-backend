import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  @IsNumber()
  @IsOptional()
  product_id: number;
}
