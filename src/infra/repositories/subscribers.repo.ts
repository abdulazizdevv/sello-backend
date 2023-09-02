import { Repository } from 'typeorm';
import { Subscribers } from '../entities/subscribers.entity';

export type SubscribersRepo = Repository<Subscribers>;
