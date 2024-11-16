import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: 'your-secret-key', // Same secret as used for signing JWTs
    });
  }

  async validate(payload: any) {
    // `payload` is the decoded JWT payload
    return { userId: payload.sub, username: payload.username };
  }
}
