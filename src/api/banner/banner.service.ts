import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/infra/entities/banner.entity';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { BannerRepo } from 'src/infra/repositories/banner.repo';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CategoryRepo } from 'src/infra/repositories/category.repo';
import { SubcategoryRepo } from 'src/infra/repositories/subcategory.repo';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private readonly repo: BannerRepo,
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
    @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: SubcategoryRepo,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    try {
      const { image, catalog_name, category_name, subcategory_name } =
        createBannerDto;

      const catalog = await this.catalogRepo.findOne({
        where: { catalog_name },
      });
      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { category_name },
      });
      if (!category) return { message: 'Category not found!' };

      const subcategory = await this.subcategoryRepo.findOne({
        where: { subcategory_name },
      });
      if (!subcategory) return { message: 'Subcategory not found!' };

      const data = this.repo.create({
        image,
        catalog_name,
        category_name,
        subcategory_name,
      });

      await this.repo.save(data);
      return { message: 'Created banner' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    try {
      const { image, catalog_name, category_name, subcategory_name } =
        updateBannerDto;

      const catalog = await this.catalogRepo.findOne({
        where: { catalog_name },
      });
      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { category_name },
      });
      if (!category) return { message: 'Category not found!' };

      const subcategory = await this.subcategoryRepo.findOne({
        where: { subcategory_name },
      });
      if (!subcategory) return { message: 'Subcategory not found!' };

      await this.repo.update(
        { id },
        {
          image,
          catalog_name,
          category_name,
          subcategory_name,
        },
      );
      return { message: 'Updated banner' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted banner' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
