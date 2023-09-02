import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsNumber()
  @IsNotEmpty()
  catalog_id: number;
}