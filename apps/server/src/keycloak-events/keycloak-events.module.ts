import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EmployeesService } from '../employees/employees.service';
import { KeycloakEventsController } from './keycloak-events.controller';
import { KeycloakEventsService } from './keycloak-events.service';

@Module({
  imports: [HttpModule],
  providers: [KeycloakEventsService, EmployeesService],
  controllers: [KeycloakEventsController],
})
export class KeycloakEventsModule {}
