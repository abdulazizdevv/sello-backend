import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from 'src/infra/entities/banner.entity';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Catalog, Category, Subcategory])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
