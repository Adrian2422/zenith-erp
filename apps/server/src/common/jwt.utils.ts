import * as jwt from 'jsonwebtoken';

import { KeycloakToken } from '../auth/access-token.interface';

export const decodeToken = (token: string): KeycloakToken | null => {
  try {
    return <KeycloakToken>jwt.decode(token);
  } catch (error) {
    throw new Error(error.message);
  }
};
