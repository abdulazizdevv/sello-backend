import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';

export type FavoriteRepo = Repository<Favorite>;
