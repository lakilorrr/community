import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
  code: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
