import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

export type OrderRepo = Repository<Order>;
