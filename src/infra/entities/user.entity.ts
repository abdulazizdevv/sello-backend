import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Basket } from './basket.entity';
import { Favorite } from './favorite.entity';
import { Notification } from './notification.entity';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: null })
  birth_day: Date;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: false })
  isVerify: boolean;

  @OneToMany(() => Basket, (basket) => basket.user)
  basket: Basket[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
