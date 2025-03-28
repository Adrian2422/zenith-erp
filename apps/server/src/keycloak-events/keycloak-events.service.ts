import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

import { decodeToken } from '../common/jwt.utils';
import { EmployeesService } from '../employees/employees.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { AccessRegisterEntity } from './entities/access-register.entity';
import { AdminUserCreateEntity } from './entities/admin-user-create.entity';
import { AdminUserDeleteEntity } from './entities/admin-user-delete.entity';
import { WebhookEntity } from './entities/webhook.entity';

@Injectable()
export class KeycloakEventsService implements OnModuleInit {
  private readonly targetUrl: string;
  private readonly keycloakUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly webhookSecret: string;

  private accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly employeesService: EmployeesService,
  ) {
    this.targetUrl = process.env.KEYCLOAK_EVENTS_TARGET_URL;
    this.keycloakUrl = process.env.KEYCLOAK_URL;
    this.realm = process.env.KEYCLOAK_REALM;
    this.clientId = process.env.KEYCLOAK_EVENTS_CLIENT;
    this.clientSecret = process.env.KEYCLOAK_EVENTS_CLIENT_SECRET;
    this.webhookSecret = process.env.KEYCLOAK_EVENTS_SECRET;
  }

  public async onModuleInit(): Promise<void> {
    if (!this.targetUrl || !this.webhookSecret) {
      console.error('Keycloak events: Missing targetUrl/webhookSecret');

      return;
    }
    const webhooks: CreateWebhookDto[] = [
      // {
      //   enabled: true,
      //   url: `${this.targetUrl}/api/keycloak-events`,
      //   secret: this.webhookSecret,
      //   eventTypes: ['*'],
      // },
      {
        enabled: true,
        url: `${this.targetUrl}/api/keycloak-events/admin-user-create`,
        secret: this.webhookSecret,
        eventTypes: ['admin.USER-CREATE'],
      },
      {
        enabled: true,
        url: `${this.targetUrl}/api/keycloak-events/admin-user-delete`,
        secret: this.webhookSecret,
        eventTypes: ['admin.USER-DELETE'],
      },
      {
        enabled: true,
        url: `${this.targetUrl}/api/keycloak-events/access-register`,
        secret: this.webhookSecret,
        eventTypes: ['access.REGISTER'],
      },
    ];

    for (const webhook of webhooks) {
      await this.setWebhook(webhook);
    }
  }

  public async getClientToken(): Promise<string> {
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

  public async getWebhooks(): Promise<WebhookEntity[]> {
    const token = await this.getClientToken();
    const url = `${this.keycloakUrl}/realms/zenith-realm/webhooks`;
    const response = await firstValueFrom(
      this.httpService.get<WebhookEntity[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    return response.data;
  }

  public async setWebhook(body: CreateWebhookDto): Promise<void> {
    const currentWebhooks = await this.getWebhooks();
    const url = `${this.keycloakUrl}/realms/zenith-realm/webhooks`;

    if (currentWebhooks.length > 0 && currentWebhooks.some((w) => w.url === body.url)) {
      return;
    }

    const token = await this.getClientToken();

    this.httpService
      .post<void>(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe();
  }

  // *
  public async handleEveryEvent(payload: unknown): Promise<unknown> {
    return payload;
  }

  // access.REGISTER
  public async handleAccessRegisterEvent(payload: AccessRegisterEntity): Promise<void> {
    const { details: { firstName, lastName, email } ,
      authDetails: { userId },
    } = payload;

    await this.employeesService.create({
      keycloakId: userId,
      firstName,
      lastName,
      email
    });
  }

  // admin.USER-CREATE
  public async handleAdminUserCreateEvent(payload: AdminUserCreateEntity): Promise<void> {
    const { newUserId, representation } = plainToInstance(AdminUserCreateEntity, payload);
    const { firstName, lastName, email } = JSON.parse(representation);

    await this.employeesService.create({
      keycloakId: newUserId,
      firstName,
      lastName,
      email
    });
  }

  // admin.USER-DELETE
  public async handleAdminUserDeleteEvent(payload: AdminUserDeleteEntity): Promise<void> {
    const {
      details: { userId },
    } = plainToInstance(AdminUserDeleteEntity, payload);

    await this.employeesService.remove(userId);
  }
}
