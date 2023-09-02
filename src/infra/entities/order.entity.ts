import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lname: string;

  @Column()
  phone_number: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  apartment: string;

  @Column()
  order_price: number;

  @Column()
  product_count: number;

  @Column()
  message_to_courier: string;

  @Column({ default: false })
  is_private: boolean;

  @Column({ default: 'prosess' })
  status: string;

  @ManyToOne(() => User, (user) => user.orders,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.order,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
