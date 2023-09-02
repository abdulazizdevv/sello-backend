import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { Brand } from 'src/infra/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catalog, Category, Subcategory, Brand])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
