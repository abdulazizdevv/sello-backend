import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';

export type NotificationRepo = Repository<Notification>;
