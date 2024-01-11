import { Module } from '@nestjs/common';
import { ConfigService } from './configuration';

@Module({
  imports: [],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class SharedModule {}
