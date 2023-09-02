import { ForbiddenException, Injectable } from '@nestjs/common';
import { AdminLoginAuthDto, LoginAuthDto } from './dto/login-auth.dto';
import {
  RegisterAuthDto,
  RegisterVerifyAuthDto,
} from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/user.entity';
import { UserRepo } from 'src/infra/repositories/user.repo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { emailSending } from 'src/common/email';
import { Request, Response } from 'express';
import { Admin } from 'src/infra/entities/admin.entity';
import { AdminRepo } from 'src/infra/repositories/admin.repo';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: UserRepo,
    @InjectRepository(Admin) private readonly adminrepo: AdminRepo,
    private jwt: JwtService,
  ) {}
  // login
  async login(body: LoginAuthDto, res: Response) {
    try {
      const { email, password } = body;

      const findUser = await this.repo.findOne({ where: { email } });

      if (!findUser) {
        throw new ForbiddenException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        throw new ForbiddenException('Invalid credentials');
      }

      await emailSending(email, res);
    } catch (error) {
      return { message: error.message };
    }
  }

  // login for admin
  async adminlogin(body: AdminLoginAuthDto) {
    try {
      const { email, password } = body;

      if (email !== "admin123@gmail.com")
      return { message: 'You are not admin!' };

      if (password !== "admin")
        return { message: 'You are not admin!' };

      const token = this.jwt.sign({
        user_id: 1,
        role: "admin",
      });
      return { token };
    } catch (error) {
      return { messsage: error.message };
    }
  }

  // register
  async register(body: RegisterAuthDto, res: Response) {
    try {
      const { phone_number, email, password } = body;

      const findUser = await this.repo.findOne({ where: { email } });

      if (findUser) {
        return await emailSending(email, res);
      }

      const hashpass = await bcrypt.hash(password, 12);

      const data = this.repo.create({
        phone_number,
        password: hashpass,
        email,
      });
      await this.repo.save(data);
      await emailSending(email, res);
    } catch (error) {
      console.log(error.message);
      return { message: error.message };
    }
  }
  // verifyCode
  async registerVerify(body: RegisterVerifyAuthDto, req: Request) {
    try {
      const { verifycode } = body;

      const { code, email } = req.cookies;
      console.log(req.cookies);

      if (!code || code != verifycode) {
        return { message: 'Incorrect code!' };
      }
      const findUser = await this.repo.findOne({ where: { email } });

      await this.repo.update(findUser.id, { isVerify: true });

      const token = this.jwt.sign({ user_id: findUser.id });

      return { message: 'Success', token: token };
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}
