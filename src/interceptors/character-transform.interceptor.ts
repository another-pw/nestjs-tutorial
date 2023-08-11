import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CharacterTransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CharacterTransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Visiting an interceptor (before route handler)...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        this.logger.log(`Request's execution time: ${Date.now() - now}ms`),
      ),
      map((res) => {
        const hunters = ['Joseph', 'Blood Queen'];
        return res.reduce((data: any[], each: any) => {
          data.push({
            ...each,
            role: hunters.includes(each.name) ? 'Hunter' : 'Survivor',
          });

          return data;
        }, []);
      }),
      tap(() =>
        this.logger.log('Exiting an interceptor (after route handler)...'),
      ),
    );
  }
}
