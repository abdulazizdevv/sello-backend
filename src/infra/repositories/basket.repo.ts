import { Repository } from 'typeorm';
import { Basket } from '../entities/basket.entity';

export type BasketRepo = Repository<Basket>;
