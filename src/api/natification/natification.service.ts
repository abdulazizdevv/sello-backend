import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNatificationDto } from './dto/create-natification.dto';
import { UpdateNatificationDto } from './dto/update-natification.dto';
import { Notification } from '../../infra/entities/notification.entity';
import { NotificationRepo } from 'src/infra/repositories/natification.repo';
import { User } from 'src/infra/entities/user.entity';
import { UserRepo } from 'src/infra/repositories/user.repo';
import { Request } from 'express';

interface forUser extends Request {
  verify?: {
    user_id: number;
  };
}

@Injectable()
export class NatificationService {
  constructor(
    @InjectRepository(Notification) private readonly repo: NotificationRepo,
    @InjectRepository(User) private readonly userRepo: UserRepo,
  ) {}
  async create(createNatificationDto: CreateNatificationDto, req: forUser) {
    try {
      const { user_id } = req.verify;
      const { message } = createNatificationDto;

      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      const data = this.repo.create({ message, user });
      await this.repo.save(data);
      return { message: 'Sending message' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['user'] });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      return { data };
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(
    id: number,
    updateNatificationDto: UpdateNatificationDto,
    req: forUser,
  ) {
    try {
      const { user_id } = req.verify;
      const { message } = updateNatificationDto;

      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) return { message: 'User not found!' };

      await this.repo.update({ id }, { message, user });

      return { message: 'Updated message' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete({ id });
      return { message: 'Deleted message' };
    } catch (error) {
      return { message: error.message };
    }
  }
}
