import { Repository } from 'typeorm';
import { Catalog } from '../entities/catalog.entity';

export type CatalogRepo = Repository<Catalog>;
