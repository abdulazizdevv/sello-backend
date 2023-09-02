import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'notification' })
export class Notification extends BaseEntity {
  @Column({ nullable: false })
  message: string;

  @ManyToOne(() => User, (user) => user.notifications,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
