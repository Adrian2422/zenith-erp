import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'http://localhost:8080/realms/zenith-realm',
      audience: 'zenith-swagger',
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: 'http://localhost:8080/realms/zenith-realm/protocol/openid-connect/certs',
        cache: true,
        rateLimit: true,
      }),
    });
  }

  public async validate(payload: any): Promise<any> {
    return { userId: payload.sub, roles: payload.realm_access.roles };
  }
}
