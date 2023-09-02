import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  product_image: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  product_info: any;

  @IsNumber()
  @IsOptional()
  product_count: number;

  @IsNumber()
  @IsOptional()
  catalog_id: number;

  @IsNumber()
  @IsOptional()
  category_id: number;

  @IsNumber()
  @IsOptional()
  subcategory_id: number;

  @IsNumber()
  @IsOptional()
  brand_id: number;
}
