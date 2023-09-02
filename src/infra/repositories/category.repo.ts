import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

export type CategoryRepo = Repository<Category>;
