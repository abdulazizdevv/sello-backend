import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  catalog_name: string;

  @IsString()
  @IsOptional()
  category_name: string;

  @IsString()
  @IsOptional()
  subcategory_name: string;
}
