/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UseFilters,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ServerService } from './services/server.service';
import { RequestDto } from './dtos/data.request.dto';
import {
  MetaResponseDto,
  BooleanResponseDto,
  InfoResponseDto,
  ActionFieldsValidationResponse,
  BaseResponse,
} from './dtos/responses.dto';
import { ApiExceptionFilter } from './exception.filter';
import { PackageService } from './services/package.service';
import { ActionFieldDto } from './dtos/action-field.dto';
import { LabelTypeEnum } from './enums/label.type.enum';
import { Client } from './client/client.service';
import { LanguageEnum } from './enums/language.enum';
import { InstallRequestDto } from './dtos/install-request.dto';
import { TemplateActionEnum } from './enums/template-action.enum';

@Controller()
@ApiTags('product-provider')
@UseFilters(new ApiExceptionFilter())
@UseGuards(AuthGuard('bearer'))
@ApiBearerAuth()
@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
export class AppController {
  constructor(
    private readonly serverService: ServerService,
    private readonly packageService: PackageService,
    private readonly client: Client,
  ) {}

  /**
   * @returns ProviderInfoResponseDto
   */
  @ApiOkResponse({ type: InfoResponseDto })
  @HttpCode(200)
  @Get('info')
  async info(): Promise<InfoResponseDto> {
    const packs = await this.packageService.getPackages();
    const packages = {};
    packs.map((element) => {
      packages[element.name] = element.name;
    });

    const servicePlanField: ActionFieldDto = {
      id: 'service-plan',
      label: 'Service Plan',
      value: packages,
      regexValidation: '',
      type: LabelTypeEnum.LIST,
      required: true,
      remoteValidation: false,
      disabled: false,
      hidden: false,
    };
    return {
      code: 200,
      message: 'Ok',
      info: {
        name: 'cPanel',
        actionFields: [servicePlanField],
        productTabs: [
          {
            label: 'statistics',
            url: 'https://localhost:3001/statistics',
          },
        ],
        listActions: [
          {
            icon: '',
            link: 'https://localhost:3001/login-to-panel',
            label: 'Login',
          },
        ],
        settings: [
          {
            label: 'servers',
            url: 'https://localhost:3001/servers',
          },
          {
            label: 'packages',
            url: 'https://localhost:3001/packages',
          },
        ],
        menuItems: [],
        returnMetaKeys: [
          'server',
          'username',
          'password',
          'nameserver1',
          'nameserver2',
          'nameserver3',
          'nameserver4',
          'ipaddress1',
          'ipaddress2',
          'ipaddress3',
          'ipaddress4',
        ],
      },
    };
  }

  /**
   *
   * @param requestBody RequestDto
   * @returns Promise with ResponseDto
   */
  @ApiBody({ type: RequestDto })
  @HttpCode(201)
  @Post('create')
  async create(@Body() requestBody: RequestDto): Promise<BaseResponse> {
    const domain = requestBody.productData.meta.public.domain;
    const servicePlanName = requestBody.productData.meta.public['service-plan'];

    for (const server of requestBody.productData.options.servers) {
      if (server.includes('test')) {
        throw new BadRequestException('Invalid server: ' + server);
      }
    }

    const splitName = requestBody.userData.firstName.slice(0, 3);
    // const username = splitName + '_' + requestBody.productData.id;

    const task = await this.client.tasks.create({
      description: 'service plan creation',
      startedDate: new Date(),
      completedDate: new Date(new Date().setHours(new Date().getHours() + 2)),
    });

    return {
      code: 201,
      message: 'Ok',
      data: task.id,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @Post('renew')
  @ApiOkResponse({ description: 'Ok', type: MetaResponseDto })
  @HttpCode(200)
  async renew(@Body() requestBody: RequestDto): Promise<MetaResponseDto> {
    return {
      code: 200,
      message: 'Ok',
      meta: {
        private: null,
        public: null,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @Post('upgrade')
  @ApiOkResponse({ description: 'Ok', type: MetaResponseDto })
  @HttpCode(200)
  async upgrade(@Body() requestBody: RequestDto): Promise<MetaResponseDto> {
    return {
      code: 200,
      message: 'Ok',
      meta: {
        private: null,
        public: null,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @Post('downgrade')
  @ApiOkResponse({ description: 'Ok', type: MetaResponseDto })
  @HttpCode(200)
  async downgrade(@Body() requestBody: RequestDto): Promise<MetaResponseDto> {
    return {
      code: 200,
      message: 'Ok',
      meta: {
        private: null,
        public: null,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiOkResponse({ description: 'Ok', type: MetaResponseDto })
  @HttpCode(200)
  @Post('suspend')
  async suspend(@Body() requestBody: RequestDto): Promise<MetaResponseDto> {
    const username = requestBody.productData.meta.public.username;

    if (username.includes('test')) {
      throw new BadRequestException('Could not suspend account');
    }

    Object.assign(requestBody.productData.meta.public, { suspended: true });

    return {
      code: 200,
      message: 'Ok',
      meta: {
        private: requestBody.productData.meta.private,
        public: requestBody.productData.meta.public,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiOkResponse({ description: 'Ok', type: MetaResponseDto })
  @HttpCode(200)
  @Post('unsuspend')
  async unsuspend(@Body() requestBody: RequestDto): Promise<MetaResponseDto> {
    if (!requestBody.productData.meta.public.suspended) {
      throw new BadRequestException('Account is not suspended');
    }

    const username = requestBody.productData.meta.public.username;

    Object.assign(requestBody.productData.meta.public, { suspended: false });

    return {
      code: 200,
      message: 'Ok',
      meta: {
        private: requestBody.productData.meta.private,
        public: requestBody.productData.meta.public,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @Post('delete')
  @ApiOkResponse({ description: 'Ok', type: BooleanResponseDto })
  @HttpCode(200)
  async delete(@Body() requestBody: RequestDto): Promise<BooleanResponseDto> {
    const username = requestBody.productData.meta.public.username;

    if (username.includes('test')) {
      throw new BadRequestException('Could not delete account');
    }

    return {
      code: 200,
      message: 'Ok',
      result: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiBody({ type: Object })
  @Post('validate/action-fields')
  @ApiOkResponse()
  @HttpCode(200)
  async validateActionFields(
    @Body() requestBody: { [key: string]: string },
  ): Promise<ActionFieldsValidationResponse> {
    return {
      code: 200,
      message: 'Ok',
      actionFields: [],
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiBody({ type: Object })
  @Post('validate/addons')
  @ApiOkResponse()
  @HttpCode(200)
  async validateAddons(
    @Body() requestBody: { [key: string]: string },
  ): Promise<ActionFieldsValidationResponse> {
    return {
      code: 200,
      message: 'Ok',
      actionFields: [],
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiBody({ type: InstallRequestDto })
  @Post('install')
  @ApiOkResponse()
  @HttpCode(200)
  async install(@Body() requestDto: InstallRequestDto): Promise<any> {
    const template = await this.client.templates.create({
      language: LanguageEnum.LANG_GREEK,
      payload: ['subject', 'body'],
    });

    const addon = await this.client.addons.create({
      name: 'SSL_install',
      active: true,
      title: [
        {
          language: LanguageEnum.LANG_GREEK,
          text: 'Εγκατάσταση SSL',
        },
      ],
      description: [
        {
          language: LanguageEnum.LANG_GREEK,
          text: 'Εγκατάσταση SSL',
        },
      ],
      icon_url: 'url',
      required: false,
      type: LabelTypeEnum.CHECKBOX,
    });

    const product = await this.client.products.create({
      name: 'Hoster-Bronze',
      title: [
        {
          language: LanguageEnum.LANG_ENGLISH,
          text: 'Bronze hosting',
        },
      ],
      description: [
        {
          language: LanguageEnum.LANG_ENGLISH,
          text: 'Bronze hosting',
        },
      ],
      addonIds: [addon.data.id],
      defaultPrices: [{ policy: requestDto.policy }],
      providerId: requestDto.providerId,
      userId: requestDto.policy.userId,
      templates: [
        {
          templateId: template.data.id,
          action: TemplateActionEnum.CREATE,
        },
      ],
    });

    return {
      code: 200,
      message: 'Success',
      data: {
        template: template['data'],
        addon: addon['data'],
        product: product['data'],
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @Post('uninstall')
  @ApiOkResponse()
  @HttpCode(200)
  async uninstall(@Body() requestDto): Promise<any> {
    await this.client.products.delete(requestDto.productName);

    for (const name of requestDto.addonNames) {
      await this.client.addons.delete(name);
    }

    for (const id of requestDto.templateIds) {
      await this.client.templates.delete(id);
    }

    return {
      code: 200,
      message: 'Success',
    };
  }
}
