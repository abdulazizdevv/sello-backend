import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  catalog_name: string;

  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsString()
  @IsOptional()
  subcategory_name: string;
}
