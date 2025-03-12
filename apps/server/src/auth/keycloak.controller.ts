import { Controller, Get } from '@nestjs/common';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

import { KeycloakUserEntity } from './entities/keycloak-user.entity';
import { KeycloakService } from './keycloak.service';

@ApiTags('keycloak')
@ApiOAuth2(['openid', 'profile'])
@Controller('keycloak')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Get('users')
  public async getUsers(): Promise<KeycloakUserEntity[]> {
    return this.keycloakService.getUsers();
  }
}
