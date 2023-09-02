import { Entity, Column, OneToMany } from 'typeorm';
import { Banner } from './banner.entity';
import { BaseEntity } from './base.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Subcategory } from './subcategory.entity';
@Entity({ name: 'catalogs' })
export class Catalog extends BaseEntity {
  @Column()
  catalog_name: string;

  @OneToMany(() => Category, (category) => category.catalog)
  categories: Category[];

  @OneToMany(() => Brand, (brand) => brand.catalog)
  brands: Brand[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.catalog)
  subcategories: Subcategory[];

  @OneToMany(() => Product, (product) => product.catalog)
  products: Product[];
}
