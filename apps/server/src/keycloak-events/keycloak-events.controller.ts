import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

import { AccessRegisterEntity } from './entities/access-register.entity';
import { AdminUserCreateEntity } from './entities/admin-user-create.entity';
import { AdminUserDeleteEntity } from './entities/admin-user-delete.entity';
import { KeycloakEventsService } from './keycloak-events.service';

@ApiTags('keycloak-events')
@Public()
@Controller('keycloak-events')
export class KeycloakEventsController {
  constructor(
    private readonly webhooksService: KeycloakEventsService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  public async handleEveryEvent(@Body() payload: unknown): Promise<void> {
    const response = await this.webhooksService.handleEveryEvent(payload);
    console.log(response);
  }

  @Post('access-register')
  public async handleAccessRegisterEvent(
    @Body() payload: AccessRegisterEntity,
  ): Promise<void> {
    await this.webhooksService.handleAccessRegisterEvent(payload);
  }

  @Post('admin-user-create')
  public async handleAdminUserCreateEvent(
    @Body() payload: AdminUserCreateEntity,
  ): Promise<void> {
    await this.webhooksService.handleAdminUserCreateEvent(payload);
  }

  @Post('admin-user-delete')
  public async handleAdminUserDeleteEvent(
    @Body() payload: AdminUserDeleteEntity,
  ): Promise<void> {
    await this.webhooksService.handleAdminUserDeleteEvent(payload);
  }
}
