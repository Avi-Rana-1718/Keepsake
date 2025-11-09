import { ArgumentsHost, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;

    if(exception instanceof HttpException) {
       status = exception.getStatus() 
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message
    });
  }
}
