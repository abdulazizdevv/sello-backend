import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export type ProductRepo = Repository<Product>;
