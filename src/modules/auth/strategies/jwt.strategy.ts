import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface payloadLoggin {
  id: string,
  name: string,
  email: string,
  iat: number,
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,      
    });
  }

  async validate(payload: payloadLoggin) {
    return { sub: payload.id, name: payload.name, email: payload.email };
  }
}

