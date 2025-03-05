import { JwtPayload } from 'jsonwebtoken';

export interface KeycloakToken extends JwtPayload {
  typ: string;
  azp: string;
  acr: string;
  allowedOrigins: string[];
  realmAccess: {
    roles: string[];
  };
  resourceAccess: {
    [resource: string]: {
      roles: string[];
    };
  };
  scope: string;
  clientHost: string;
  emailVerified: boolean;
  preferredUsername: string;
  clientAddress: string;
  clientId: string;
}
