import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Basket } from 'src/infra/entities/basket.entity';
import { Product } from 'src/infra/entities/product.entity';
import { User } from 'src/infra/entities/user.entity';
import { BasketRepo } from 'src/infra/repositories/basket.repo';
import { ProductRepo } from 'src/infra/repositories/product.repo';
import { UserRepo } from 'src/infra/repositories/user.repo';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

interface forUser extends Request {
  verify?: {
    user_id: number;
  };
}

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private readonly repo: BasketRepo,
    @InjectRepository(User) private readonly userRepo: UserRepo,
    @InjectRepository(Product) private readonly productRepo: ProductRepo,
  ) {}
  async create(createBasketDto: CreateBasketDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const { product_id } = createBasketDto;

      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };
      const baskets = await this.repo.find({ relations: ['user', 'product'] });

      const findBasket = baskets.find(
        (basket) =>
          basket.user.id === user_id && basket.product.id === product_id,
      );
      if (findBasket)
        return {
          message: 'You have already added this product to the basket.',
        };

      const data = this.repo.create({ user, product });
      await this.repo.save(data);
      return { message: 'The product has been added to the basket' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['user', 'product'] });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({
        where: { id },
        relations: ['user', 'product'],
      });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateBasketDto: UpdateBasketDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const { product_id } = updateBasketDto;
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      await this.repo.update({ id }, { user, product });
      return { messsage: 'Updated basket' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted basket' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
