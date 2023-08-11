import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RolesCheckerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RolesCheckerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Attaching a role in the request headers...');
    req.headers.role = 'admin';
    this.logger.log(JSON.stringify(req.headers));
    next();
  }
}
