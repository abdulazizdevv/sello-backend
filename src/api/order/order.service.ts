import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/infra/entities/order.entity';
import { Product } from 'src/infra/entities/product.entity';
import { User } from 'src/infra/entities/user.entity';
import { OrderRepo } from 'src/infra/repositories/order.repo';
import { ProductRepo } from 'src/infra/repositories/product.repo';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';

interface forUser extends Request {
  verify?: {
    user_id: number;
  };
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repo: OrderRepo,
    @InjectRepository(User) private readonly userRepo: OrderRepo,
    @InjectRepository(Product) private readonly productRepo: ProductRepo,
  ) {}
  async create(createOrderDto: CreateOrderDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const {
        name,
        lname,
        phone_number,
        apartment,
        district,
        province,
        street,
        message_to_courier,
        order_price,
        product_count,
        is_private,
        product_id,
      } = createOrderDto;

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      const user = await this.userRepo.findOne({
        where: { id: user_id },
      });
      if (!user) return { message: 'User not found!' };

      const data = this.repo.create({
        name,
        lname,
        phone_number,
        apartment,
        district,
        province,
        street,
        message_to_courier,
        order_price,
        product_count,
        is_private,
        user,
        product,
      });

      await this.repo.save(data);
      return { message: 'Created order' };
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
      const data = await this.repo.findOne({ where: { id } });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const {
        name,
        lname,
        phone_number,
        apartment,
        district,
        province,
        street,
        message_to_courier,
        order_price,
        product_count,
        is_private,
        product_id,
      } = updateOrderDto;

      const product = await this.productRepo.findOne({
        where: { id: product_id },
      });
      if (!product) return { message: 'Product not found!' };

      const user = await this.userRepo.findOne({
        where: { id: user_id },
      });
      if (!user) return { message: 'User not found!' };

      await this.repo.update(
        { id },
        {
          name,
          lname,
          phone_number,
          apartment,
          district,
          province,
          street,
          message_to_courier,
          order_price,
          product_count,
          is_private,
          user,
          product,
        },
      );
      return { message: 'Updated order' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted order' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
