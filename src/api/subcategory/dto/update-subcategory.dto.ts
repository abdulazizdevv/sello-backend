import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateSubcategoryDto } from './create-subcategory.dto';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
  @IsString()
  @IsOptional()
  subcategory_name: string;

  @IsNumber()
  @IsOptional()
  catalog_id: number;

  @IsNumber()
  @IsOptional()
  category_id: number;
}
