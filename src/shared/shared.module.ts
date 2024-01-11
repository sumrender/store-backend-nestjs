import { Module } from '@nestjs/common';
import { ConfigService } from './configuration';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class SharedModule {}
