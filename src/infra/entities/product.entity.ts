import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Basket } from './basket.entity';
import { Brand } from './brand.entity';
import { Catalog } from './catalog.entity';
import { Category } from './category.entity';
import { Discount } from './discount.entity';
import { Subcategory } from './subcategory.entity';
import { Favorite } from './favorite.entity';
import { Order } from './order.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({ nullable: false })
  product_image: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'jsonb' })
  product_info: any;

  @Column({ nullable: false })
  product_count: number;

  @OneToMany(() => Basket, (basket) => basket.product)
  basket: Basket[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => Order, (order) => order.product)
  order: Order[];

  @OneToMany(() => Discount, (discount) => discount.product)
  discount: Discount;

  @ManyToOne(() => Catalog, (catalog) => catalog.products,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'catalog_id' })
  catalog: Catalog;

  @ManyToOne(() => Category, (category) => category.products,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @ManyToOne(() => Brand, (brand) => brand.products,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
