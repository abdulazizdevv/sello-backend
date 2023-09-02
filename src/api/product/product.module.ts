import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/infra/entities/product.entity';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { Brand } from 'src/infra/entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Catalog, Category, Subcategory, Brand]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
