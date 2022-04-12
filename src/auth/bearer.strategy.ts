import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor() {
    super();
  }

  public async validate(token: string): Promise<string | Error> {
    if (!token || token != process.env.SERVICE_PROVIDER_TOKEN) {
      throw new UnauthorizedException();
    }

    return token;
  }
}
