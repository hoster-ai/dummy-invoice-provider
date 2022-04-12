import {
  Controller,
  Get,
  UseGuards,
  UseFilters,
  HttpCode,
  Post,
  Body,
  BadGatewayException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestDto } from './dtos/data.request.dto';
import {
  InfoResponseDto,
  InvoiceSuccessResponseDto,
  InvoiceTaskResponseDto,
} from './dtos/responses.dto';
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
  @ApiOkResponse({ type: InvoiceSuccessResponseDto || InvoiceTaskResponseDto })
  @HttpCode(200)
  @Post('invoice')
  async invoice(
    @Body() requestDto: RequestDto,
  ): Promise<InvoiceSuccessResponseDto | InvoiceTaskResponseDto> {
    if (requestDto.orderData.length === 1) {
      return {
        code: 200,
        message: 'Success',
        invoice_pdf: 'url',
      } as InvoiceSuccessResponseDto;
    } else if (requestDto.orderData.length === 2) {
      return {
        code: 200,
        message: 'Success',
        taskId: 'taskId',
      };
    } else {
      throw new BadGatewayException('Could not invoice orders');
    }
  }
}
