import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/infra/entities/discount.entity';
import { Product } from 'src/infra/entities/product.entity';
import { DiscountRepo } from 'src/infra/repositories/discount.repo';
import { ProductRepo } from 'src/infra/repositories/product.repo';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

interface forQuery extends String {
  by?: string;
  to?: string;
}
interface forRange extends Object {
  min?: number;
  max?: number;
}

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount) private readonly discountRepo: DiscountRepo,
    @InjectRepository(Product) private readonly productRepo: ProductRepo,
  ) {}

  async filterByRange(query: Object) {
    try {
      const { min, max } = query as forRange;

      const data = await this.discountRepo
        .createQueryBuilder('discount')
        .leftJoinAndSelect('discount.product', 'products')
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
      const data = await this.discountRepo
        .createQueryBuilder('discount')
        .leftJoinAndSelect('discount.product', 'products')
        .orderBy(`products.${by}`, to as 'ASC' | 'DESC')
        .getMany();
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createDiscountDto: CreateDiscountDto) {
    try {
      const { percentage, end_time, product_id } = createDiscountDto;

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      const discounts = await this.discountRepo.find({
        relations: ['product'],
      });
      const findDiscount = discounts.find(
        (discount) => discount.product.id === product_id,
      );
      if (findDiscount)
        return {
          message:
            'This product has already been discounted. You can change it.',
        };

      const data = this.discountRepo.create({ percentage, end_time, product });
      await this.discountRepo.save(data);

      return { message: 'Create discount' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.discountRepo.find({ relations: ['product'] });
      return { data: data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.discountRepo.findOne({
        where: { id },
        relations: ['product'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    try {
      const { percentage, end_time, product_id } = updateDiscountDto;

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      await this.discountRepo.update({ id }, { percentage, end_time, product });

      return { message: 'Updated discount' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.discountRepo.delete({ id });
      return { message: 'Deleted discount' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
