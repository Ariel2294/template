import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private config: ConfigService) {}

  get nodeEnv(): string {
    return this.config.get('NODE_ENV');
  }

  get jwt(): {
    secret: string;
    expiresIn: string;
  } {
    return {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    };
  }
}
