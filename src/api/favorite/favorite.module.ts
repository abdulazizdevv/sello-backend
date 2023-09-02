import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/infra/entities/favorite.entity';
import { User } from 'src/infra/entities/user.entity';
import { Product } from 'src/infra/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Product])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
