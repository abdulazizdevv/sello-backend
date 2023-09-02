import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token =
        request.headers.authorization?.split(' ')[1] ??
        request.headers.authorization;

      if (!token) return false;

      const data = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request.verify = { user_id: data.user_id, role: data?.role };

      return true;
    } catch (error) {
      throw new ForbiddenException('Forbidden');
    }
  }
}
