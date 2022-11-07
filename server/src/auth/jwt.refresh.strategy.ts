import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh-token'),
      secretOrKey: 'secretRefreshKey',
    });
  }
  async validate(payload) {
    const userExist = await this.authService.validateUser(payload.id);
    if (!userExist) {
      throw new UnauthorizedException('无效token');
    }
    return userExist;
  }
}
