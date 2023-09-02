import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'favorites' })
export class Favorite extends BaseEntity {
  @ManyToOne(() => User, (user) => user.favorites,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.favorites,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
