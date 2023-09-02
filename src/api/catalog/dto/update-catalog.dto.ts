import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateCatalogDto } from './create-catalog.dto';

export class UpdateCatalogDto extends PartialType(CreateCatalogDto) {
  @IsString()
  @IsOptional()
  catalog_name: string;
}
