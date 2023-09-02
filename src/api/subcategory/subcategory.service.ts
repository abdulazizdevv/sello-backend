import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CategoryRepo } from 'src/infra/repositories/category.repo';
import { SubcategoryRepo } from 'src/infra/repositories/subcategory.repo';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

interface forQuery extends String {
  by?: string;
  to?: string;
}
interface forRange extends Object {
  min?: number;
  max?: number;
}
@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory) private readonly repo: SubcategoryRepo,
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
    @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,
  ) {}

  async filterByRange(query: Object) {
    try {
      const { min, max } = query as forRange;

      const data = await this.repo
        .createQueryBuilder('subcategory')
        .leftJoinAndSelect('subcategory.products', 'products')
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
      const data = await this.repo
        .createQueryBuilder('subcategory')
        .leftJoinAndSelect('subcategory.products', 'products')
        .orderBy(`products.${by}`, to as 'ASC' | 'DESC')
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      const { subcategory_name, catalog_id, category_id } =
        createSubcategoryDto;

      const findSubcategory = await this.repo.findOne({
        where: { subcategory_name },
      });
      if (findSubcategory)
        return { message: 'This subcategory already exists!' };

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });

      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { id: category_id },
      });

      if (!category) return { message: 'Category not found!' };

      const data = this.repo.create({ subcategory_name, catalog, category });
      await this.repo.save(data);
      return { message: 'Created subcategory' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['products', 'brands'] });
      return { data };
    } catch (error) {
      return { meesage: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({
        where: { id },
        relations: ['products', 'brands'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const { subcategory_name, catalog_id, category_id } =
        updateSubcategoryDto;

      const catalog = await this.catalogRepo.findOne({
        where: { id: catalog_id },
      });
      if (!catalog) return { message: 'Catalog not found!' };

      const category = await this.categoryRepo.findOne({
        where: { id: category_id },
      });
      if (!category) return { message: 'Category not found!' };

      await this.repo.update({ id }, { subcategory_name, catalog, category });

      return { message: 'Updated subcategory' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted subcategory' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
