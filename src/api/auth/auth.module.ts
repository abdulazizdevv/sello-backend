import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/user.entity';
import 'dotenv/config';
import { Admin } from '../../infra/entities/admin.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User, Admin]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
