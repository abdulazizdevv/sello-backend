import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Banner } from './banner.entity';
import { BaseEntity } from './base.entity';
import { Brand } from './brand.entity';
import { Catalog } from './catalog.entity';
import { Product } from './product.entity';
import { Subcategory } from './subcategory.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column({ nullable: false })
  category_name: string;

  @ManyToOne(() => Catalog, (catalog) => catalog.categories,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'catalog_id' })
  catalog: Catalog;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Brand, (brand) => brand.category)
  brands: Brand[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

}
