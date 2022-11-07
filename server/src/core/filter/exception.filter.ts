import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let message = '';
    let code = 400;
    const response = ctx.getResponse();
    if (exception instanceof HttpException) {
      code = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        message =
          typeof exceptionResponse.message === 'string'
            ? exceptionResponse.message
            : exceptionResponse.message[0];
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    } else if (exception instanceof TypeORMError) {
      message = exception.message;
    }
    response.status(code).json({
      data: {},
      code: code,
      message: message,
    });
  }
}
