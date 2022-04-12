import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from './dtos/responses.dto';
@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  // We filter exceptions to return our dto as response
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const error: ErrorResponseDto = {
      code: status,
      message: 'Error',
      errors: exception.message,
    };

    response.status(status).json(error);
  }
}
