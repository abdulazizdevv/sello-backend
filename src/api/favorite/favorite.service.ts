import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/infra/entities/favorite.entity';
import { Product } from 'src/infra/entities/product.entity';
import { User } from 'src/infra/entities/user.entity';
import { FavoriteRepo } from 'src/infra/repositories/favorite.repo';
import { ProductRepo } from 'src/infra/repositories/product.repo';
import { UserRepo } from 'src/infra/repositories/user.repo';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import {Request} from "express"

interface forUser extends Request {
  verify?: {
    user_id: number;
  };
}

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly repo: FavoriteRepo,
    @InjectRepository(User) private readonly userRepo: UserRepo,
    @InjectRepository(Product) private readonly productRepo: ProductRepo,
  ) {}
  async create(createFavoriteDto: CreateFavoriteDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const { product_id } = createFavoriteDto;

      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      const favorities = await this.repo.find({
        relations: ['user', 'product'],
      });
      const findFavorite = favorities.find(
        (favorite) =>
          favorite.user.id === user_id && favorite.product.id === product_id,
      );

      if (findFavorite) {
        await this.repo.delete({ id: findFavorite.id });
        return { message: 'Product removed from favorites' };
      }
      const data = this.repo.create({ user, product });

      await this.repo.save(data);
      return { message: 'The product has been added to the favorite' };
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

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const { product_id } = updateFavoriteDto;
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      await this.repo.update({ id }, { user, product });
      return { message: 'Updated favorite' };
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
