import { Global, Module } from '@nestjs/common';
import { ConfigEnum, ConfigService } from './configuration';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(ConfigEnum.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get(ConfigEnum.JWT_EXPIRATION),
          },
        };
      },
      inject: [ConfigService],
      imports: [SharedModule],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService, JwtModule],
})
export class SharedModule {}
