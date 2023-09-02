import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/infra/entities/brand.entity';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { BrandRepo } from 'src/infra/repositories/brand.repo';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CategoryRepo } from 'src/infra/repositories/category.repo';
import { SubcategoryRepo } from 'src/infra/repositories/subcategory.repo';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

interface forSort {
  letter?: string;
}

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly repo: BrandRepo,
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
    @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: SubcategoryRepo,
  ) {}

  async sortByLetter(query: string) {
    try {
      const { letter } = query as forSort;
      const data = await this.repo
        .createQueryBuilder('brands')
        .where(`LEFT(brands.brand_name, 1) = :letter`, { letter })
        .orderBy(`brands.brand_name`)
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const {
        brand_image,
        brand_name,
        catalog_id,
        category_id,
        subcategory_id,
      } = createBrandDto;

      const findBrand = await this.repo.findOne({ where: { brand_name } });
      if (findBrand) return { message: 'This brand already exists!' };

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });
      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { id: category_id },
      });
      if (!category) return { message: 'Category not found!' };

      const subcategory = await this.subcategoryRepo.findOne({
        where: { id: subcategory_id },
      });
      if (!subcategory) return { message: 'Subcategory not found!' };

      const data = this.repo.create({
        brand_name,
        brand_image,
        catalog,
        category,
        subcategory,
      });
      await this.repo.save(data);

      return { message: 'Created brand' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['products'] });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({
        where: { id },
        relations: ['products'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const {
        brand_image,
        brand_name,
        catalog_id,
        category_id,
        subcategory_id,
      } = updateBrandDto;

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });
      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { id: category_id },
      });
      if (!category) return { message: 'Category not found!' };

      const subcategory = await this.subcategoryRepo.findOne({
        where: { id: subcategory_id },
      });
      if (!subcategory) return { message: 'Subcategory not found!' };

      const data = this.repo.update(
        { id },
        {
          brand_name,
          brand_image,
          catalog,
          category,
          subcategory,
        },
      );

      return { message: 'Updated brand' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted brand' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
