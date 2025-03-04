import { Environment } from './_environment';

export const environment: Environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api',
  authority: 'http://localhost:8082/realms/zenith-realm',
  clientId: 'zenith-frontend',
  wellknownEndpointUrl:
    'http://localhost:8082/realms/zenith-realm/.well-known/openid-configuration',
};
