import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { KeycloakEventsController } from './keycloak-events.controller';
import { KeycloakEventsService } from './keycloak-events.service';

@Module({
  imports: [HttpModule],
  providers: [KeycloakEventsService, UsersService],
  controllers: [KeycloakEventsController],
})
export class KeycloakEventsModule {}
