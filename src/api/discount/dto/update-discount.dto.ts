import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDiscountDto } from './create-discount.dto';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
  @IsNumber()
  @IsOptional()
  percentage: number;

  @IsString()
  @IsOptional()
  end_time: string;

  @IsNumber()
  @IsOptional()
  product_id: number;
}
