import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from 'src/infra/entities/discount.entity';
import { Product } from 'src/infra/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, Product])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
