import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

export type BannerRepo = Repository<Banner>;
