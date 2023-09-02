import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Catalog } from './catalog.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Subcategory } from './subcategory.entity';

@Entity({ name: 'brands' })
export class Brand extends BaseEntity {
  @Column({ nullable: false })
  brand_name: string;

  @Column({ nullable: false })
  brand_image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @ManyToOne(() => Catalog, (catalog) => catalog.brands,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'catalog_id' })
  catalog: Catalog;

  @ManyToOne(() => Category, (category) => category.brands,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.brands,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;
}
