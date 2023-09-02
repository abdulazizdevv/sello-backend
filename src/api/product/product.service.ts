import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/infra/entities/brand.entity';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { Category } from 'src/infra/entities/category.entity';
import { Product } from 'src/infra/entities/product.entity';
import { Subcategory } from 'src/infra/entities/subcategory.entity';
import { BrandRepo } from 'src/infra/repositories/brand.repo';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CategoryRepo } from 'src/infra/repositories/category.repo';
import { ProductRepo } from 'src/infra/repositories/product.repo';
import { SubcategoryRepo } from 'src/infra/repositories/subcategory.repo';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface forProduct {
  id?: number;
}
interface forQuery extends String {
  by?: string;
  to?: string;
}
interface forRange extends Object {
  min?: number;
  max?: number;
}
interface forSearch {
  letter?: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: ProductRepo,
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
    @InjectRepository(Category) private readonly categoryRepo: CategoryRepo,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepo: SubcategoryRepo,
    @InjectRepository(Brand) private readonly brandRepo: BrandRepo,
  ) {}

  async searchByLetter(query: string) {
    try {
      const { letter } = query as forSearch;
      const data = await this.repo
        .createQueryBuilder('product')
        .where(`LOWER(product.title) LIKE :searchTerm`, {
          searchTerm: `%${letter.toLowerCase()}%`,
        })
        .orderBy(`product.title`)
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async filterByRange(query: Object) {
    try {
      const { min, max } = query as forRange;

      const data = await this.repo
        .createQueryBuilder('products')
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
        .createQueryBuilder('products')
        .orderBy(`products.${by}`, to as 'ASC' | 'DESC')
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const {
        product_image,
        title,
        description,
        price,
        product_info,
        product_count,
        catalog_id,
        category_id,
        subcategory_id,
        brand_id,
      } = createProductDto;

      const findProduct = await this.repo.findOne({ where: { title } });

      if (findProduct) {
        const { id } = findProduct as forProduct;
        await this.repo.update(
          { id },
          { product_count: findProduct.product_count + product_count },
        );
        return { message: 'Created added' };
      }

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

      const brand = await this.brandRepo.findOne({
        where: { id: brand_id },
      });
      if (!brand) return { message: 'Brand not found!' };

      const data = this.repo.create({
        product_image,
        title,
        description,
        product_info,
        price,
        product_count,
        catalog,
        category,
        subcategory,
        brand,
      });
      await this.repo.save(data);
      return { message: 'Created product' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['discount'] });
      return data;
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const {
        product_image,
        title,
        description,
        price,
        product_info,
        product_count,
        catalog_id,
        category_id,
        subcategory_id,
        brand_id,
      } = updateProductDto;

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

      const brand = await this.brandRepo.findOne({
        where: { id: brand_id },
      });
      if (!brand) return { message: 'Brand not found!' };

      await this.repo.update(
        { id },
        {
          product_image,
          title,
          description,
          product_info,
          price,
          product_count,
          catalog,
          category,
          subcategory,
          brand,
        },
      );
      return { message: 'Updated product' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted product' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
