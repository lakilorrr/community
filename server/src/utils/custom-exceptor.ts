import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CustomExceptor {
  static exceptionMsg(message: string) {
    throw new HttpException(
      {
        data: {},
        code: HttpStatus.BAD_REQUEST,
        message: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
