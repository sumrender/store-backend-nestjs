import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedError } from 'src/shared/exceptions';
import { ConfigEnum, ConfigService } from 'src/shared/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigEnum.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);

    if (!user) {
      return done(new UnauthorizedError(), false);
    }

    return done(null, user, payload.iat);
  }
}
