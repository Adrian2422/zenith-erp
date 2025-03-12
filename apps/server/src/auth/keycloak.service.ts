import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { decodeToken } from '../common/jwt.utils';
import { KeycloakUserEntity } from './entities/keycloak-user.entity';

@Injectable()
export class KeycloakService {
  private readonly keycloakUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  private accessToken: string;

  constructor(private readonly httpService: HttpService) {
    this.keycloakUrl = process.env.KEYCLOAK_URL;
    this.realm = process.env.KEYCLOAK_REALM;
    this.clientId = process.env.KEYCLOAK_CLIENT_ID;
    this.clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
  }

  public async getAdminToken(): Promise<string> {
    if (this.accessToken && decodeToken(this.accessToken).exp >= Date.now()) {
      return this.accessToken;
    }

    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);

    const response = await firstValueFrom(this.httpService.post(url, data));

    this.accessToken = response.data.access_token;

    return response.data.access_token;
  }

  public async getUsers(): Promise<KeycloakUserEntity[]> {
    const token = await this.getAdminToken();
    const url = `${this.keycloakUrl}/admin/realms/${this.realm}/users?first=0&max=15`;

    const { data } = await firstValueFrom(
      this.httpService.get<KeycloakUserEntity[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    return data;
  }
}
