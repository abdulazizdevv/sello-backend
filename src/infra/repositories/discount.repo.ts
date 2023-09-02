import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

export type DiscountRepo = Repository<Discount>;
