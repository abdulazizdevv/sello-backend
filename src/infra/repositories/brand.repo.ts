import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

export type BrandRepo = Repository<Brand>;
