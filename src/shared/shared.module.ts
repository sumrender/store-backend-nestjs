import { Global, Module } from '@nestjs/common';
import { ConfigEnum, ConfigService } from './configuration';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ConfigEnum.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(ConfigEnum.JWT_EXPIRATION),
        },
      }),
      inject: [ConfigService],
      imports: [SharedModule],
    }),
  ],
  providers: [AuthService, ConfigService, LocalStrategy, JwtStrategy],
  exports: [ConfigService, AuthService],
})
export class SharedModule {}
