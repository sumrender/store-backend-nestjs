import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { IEnvironmentVariables } from './env-vars.interface';
import { ConfigEnum } from '../enums';

@Injectable()
export class ConfigService {
  static PORT: string;
  static DB_URL: string;
  constructor(
    private readonly configService: NestConfigService<IEnvironmentVariables>,
  ) {
    ConfigService.PORT = process.env[ConfigEnum.PORT] || '3000';
    ConfigService.DB_URL =
      process.env[ConfigEnum.DB_URL] || 'mongodb://127.0.0.1/ecom-test';
  }
  get(name: string) {
    return (
      process.env[name] ||
      this.configService.get(name as keyof IEnvironmentVariables)
    );
  }
}
