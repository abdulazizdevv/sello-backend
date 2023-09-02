import { Repository } from 'typeorm';
import { Subcategory } from '../entities/subcategory.entity';

export type SubcategoryRepo = Repository<Subcategory>;
