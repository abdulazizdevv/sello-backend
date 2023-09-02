import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/infra/entities/category.entity';
import { CatalogModule } from '../catalog/catalog.module';
import { Catalog } from 'src/infra/entities/catalog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Catalog])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
