/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  UseGuards,
  UseFilters,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestDto } from './dtos/data.request.dto';
import { ResponseDto } from './dtos/response.dto';
import { InfoResponseDto } from './dtos/responses.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { ApiExceptionFilter } from './exception.filter';

@Controller()
@UseFilters(new ApiExceptionFilter())
@UseGuards(AuthGuard('bearer'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
export class AppController {
  /**
   * @returns ProviderInfoResponseDto
   */
  @ApiOkResponse({ type: InfoResponseDto })
  @HttpCode(200)
  @Get('info')
  async info(): Promise<InfoResponseDto> {
    return {
      code: 200,
      message: 'Success',
      info: {
        name: '',
        actionFields: [],
        productTabs: [],
        menuItems: [],
        returnMetaKeys: [],
        listActions: [],
        settings: [],
      },
    };
  }

  /**
   *
   * @param requestDto
   * @returns
   */
  @ApiOkResponse({ type: ResponseDto })
  @HttpCode(200)
  @Post('invoice')
  async invoice(
    @Body() requestDto: RequestDto,
  ): Promise<ResponseDto | TaskResponseDto> {
    let success = true;

    if (
      requestDto.orderData.orderId > 100 &&
      requestDto.orderData.orderId < 500
    ) {
      success = false;
    } else if (
      requestDto.orderData.orderId > 500 &&
      requestDto.orderData.orderId < 600
    ) {
      return {
        code: 200,
        message: 'Success',
        success: true,
        invoice_pdf: 'url',
      };
    } else if (requestDto.orderData.orderId > 600) {
      return {
        code: 200,
        message: 'Success',
        taskId: 'task_id',
      };
    }

    return {
      code: 200,
      message: 'Success',
      success,
    };
  }
}
