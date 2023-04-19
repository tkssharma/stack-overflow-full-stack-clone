// Package.
import debug from 'debug';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Internal.
// Code.
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<any>();
    const message =
      exception instanceof BadRequestException
        ? (exception.getResponse() as any)?.message
        : exception.message;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      status,
      message,
    });
  }
}
