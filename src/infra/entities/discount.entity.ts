import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: 'discount' })
export class Discount extends BaseEntity {
  @Column({ nullable: false })
  percentage: number;

  @Column({ nullable: false, type: 'timestamptz' })
  end_time: Date;

  @ManyToOne(() => Product, (product) => product.discount,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
