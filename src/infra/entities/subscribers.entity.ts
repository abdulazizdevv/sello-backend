import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name:"subscribers"})
export class Subscribers extends BaseEntity {
  @Column({ nullable: false })
  email: string;
}
