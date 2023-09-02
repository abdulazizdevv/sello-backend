import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

export type AdminRepo = Repository<Admin>;
