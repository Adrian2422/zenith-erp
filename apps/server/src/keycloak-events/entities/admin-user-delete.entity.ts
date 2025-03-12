import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AdminUserDeleteDetailsEntity } from './admin-user-delete-details.entity';
import { AuthDetailsEntity } from './auth-details.entity';
import { KeycloakEventBaseEntity } from './keycloak-event-base.entity';

export class AdminUserDeleteEntity extends KeycloakEventBaseEntity {
  @ApiProperty({ type: () => AuthDetailsEntity })
  @ValidateNested()
  @Type(() => AuthDetailsEntity)
  public authDetails: AuthDetailsEntity;

  @ApiProperty({ type: () => AdminUserDeleteDetailsEntity })
  @ValidateNested()
  @Type(() => AdminUserDeleteDetailsEntity)
  public details: AdminUserDeleteDetailsEntity;

  constructor(partial: Partial<AdminUserDeleteEntity>) {
    super();
    Object.assign(this, partial);
  }
}
