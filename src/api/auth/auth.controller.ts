import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { AdminLoginAuthDto, LoginAuthDto } from './dto/login-auth.dto';
import {
  RegisterAuthDto,
  RegisterVerifyAuthDto,
} from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(body, res);
  }
  @Post('adminlogin')
  adminlogin(@Body() body: AdminLoginAuthDto) {
    return this.authService.adminlogin(body);
  }

  @Post('register')
  register(@Body() body: RegisterAuthDto, @Res() res: Response) {
    return this.authService.register(body, res);
  }
  @Post('verify')
  registerVerify(@Body() body: RegisterVerifyAuthDto, @Req() req: Request) {
    return this.authService.registerVerify(body, req);
  }
}
