import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CategoryRepo } from 'src/infra/repositories/category.repo';
import { Query } from 'typeorm/driver/Query';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

interface forQuery extends String {
  by?: string;
  to?: string;
}
interface forRange extends Object {
  min?: number;
  max?: number;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
  ) {}

  async filterByRange(query: Object) {
    try {
      const { min, max } = query as forRange;

      const data = await this.categoryRepo
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.products', 'products')
        .where('products.price >= :min', { min })
        .andWhere('products.price <= :max', { max })
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async sort(query: string) {
    try {
      const { by, to } = query as forQuery;
      const data = await this.categoryRepo
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.products', 'products')
        .orderBy(`products.${by}`, to as 'ASC' | 'DESC')
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { category_name, catalog_id } = createCategoryDto;

      const findCategory = await this.categoryRepo.findOne({
        where: { category_name },
      });
      if (findCategory) {
        return { message: 'This category already exists!' };
      }

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });
      if (!catalog) {
        return { message: 'Catalog not found!' };
      }

      const category = new Category();
      category.category_name = category_name;
      category.catalog = catalog;

      await this.categoryRepo.save(category);

      return { message: 'Created category' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.categoryRepo.find({
        relations: ['subcategories', 'products', 'brands'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.categoryRepo.findOne({
        where: { id },
        relations: ['subcategories', 'products', 'brands'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const { category_name, catalog_id } = updateCategoryDto;

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });
      if (!catalog) {
        return { message: 'Catalog not found!' };
      }

      await this.categoryRepo.update({ id }, { category_name, catalog });
      return { message: 'Updated category' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.categoryRepo.delete({ id });
      return { message: 'Deleted category' };
    } catch (error) {
      return { mesage: error.message };
    }
  }
}
