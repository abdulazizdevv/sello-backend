import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brand_name: string;

  @IsString()
  @IsNotEmpty()
  brand_image: string;

  @IsNumber()
  @IsNotEmpty()
  catalog_id: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  subcategory_id: number;
}
