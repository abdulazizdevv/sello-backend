import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  subcategory_name: string;

  @IsNumber()
  @IsNotEmpty()
  catalog_id: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
