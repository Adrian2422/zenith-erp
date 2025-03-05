import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    if (process.env.APP_ENV !== 'development') {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest();
    console.log('Incoming Request Body:', {
      url: request.url,
      body: request.body,
    });

    return next.handle().pipe(
      tap((response) => {
        console.log('Outgoing Response:', response);
      }),
    );
  }
}
