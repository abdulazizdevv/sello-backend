import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'banners' })
export class Banner extends BaseEntity {
  @Column({ nullable: false })
  image: string;

  @Column()
  catalog_name: string;

  @Column()
  category_name: string;

  @Column()
  subcategory_name: string;
}
