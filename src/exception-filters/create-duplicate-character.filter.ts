import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class CreateDuplicateCharacterFilter implements ExceptionFilter {
  private readonly logger = new Logger(CreateDuplicateCharacterFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    this.logger.log(`Entering to an exception filter layer...`);
    const status = HttpStatus.BAD_REQUEST;

    return res.status(status).json({
      statusCode: status,
      message: 'Character name is duplicated',
    });
  }
}
