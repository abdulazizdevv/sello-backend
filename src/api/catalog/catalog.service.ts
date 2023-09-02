import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from 'src/infra/entities/catalog.entity';
import { CatalogRepo } from 'src/infra/repositories/catalog.repo';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
interface forQuery extends String {
  by?: string;
  to?: string;
}
interface forRange extends Object {
  min?: number;
  max?: number;
}

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog) private readonly catalogRepo: CatalogRepo,
  ) {}

  async filterByRange(query: Object) {
    try {
      const { min, max } = query as forRange;

      const data = await this.catalogRepo
        .createQueryBuilder('catalog')
        .leftJoinAndSelect('catalog.products', 'products')
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
      const data = await this.catalogRepo
        .createQueryBuilder('catalog')
        .leftJoinAndSelect('catalog.products', 'products')
        .orderBy(`products.${by}`, to as 'ASC' | 'DESC')
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createCatalogDto: CreateCatalogDto) {
    try {
      const { catalog_name } = createCatalogDto;

      const findCatalog = await this.catalogRepo.findOne({
        where: { catalog_name },
      });
      if (findCatalog) return { message: 'This catalog already exists!' };

      const data = this.catalogRepo.create({ catalog_name });
      await this.catalogRepo.save(data);
      return { message: 'Created catalog' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.catalogRepo.find({
        relations: [
          'categories',
          'subcategories',
          'brands',
          'products',
          'products.discount',
        ],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.catalogRepo.findOne({
        where: { id },
        relations: ['categories', 'subcategories', 'brands', 'products'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateCatalogDto: UpdateCatalogDto) {
    try {
      const { catalog_name } = updateCatalogDto;
      await this.catalogRepo.update({ id }, { catalog_name });
      return { message: 'Updated catalog' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.catalogRepo.delete({ id });
      return { message: 'Deleted catalog' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
