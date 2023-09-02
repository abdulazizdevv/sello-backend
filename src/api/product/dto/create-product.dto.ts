import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  product_info: any;

  @IsNumber()
  @IsNotEmpty()
  product_count: number;

  @IsNumber()
  @IsNotEmpty()
  catalog_id: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  subcategory_id: number;

  @IsNumber()
  @IsOptional()
  brand_id: number;
}
