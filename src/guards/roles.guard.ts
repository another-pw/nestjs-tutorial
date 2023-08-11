import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    this.logger.log(
      `Inspecting route metadata of ${context.getHandler().name} in ${
        context.getClass().name
      }...`,
    );
    this.logger.log(`Allowed roles for this route: "${roles}"`);

    const req = context.switchToHttp().getRequest<Request>();
    const role = String(req.headers.role);
    const isAllowed = roles.includes(role);
    this.logger.log(
      `${
        isAllowed ? 'Request is allowed' : 'Request is rejected'
      } for role "${role}"`,
    );
    return isAllowed;
  }
}
