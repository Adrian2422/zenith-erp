import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { AccessRegisterDetailsEntity } from './access-register-details.entity';
import { AuthDetailsEntity } from './auth-details.entity';
import { KeycloakEventBaseEntity } from './keycloak-event-base.entity';

export class AdminUserCreateEntity extends KeycloakEventBaseEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public representation: string;

  @ApiProperty({ type: () => AuthDetailsEntity })
  @ValidateNested()
  @Type(() => AuthDetailsEntity)
  public authDetails: AuthDetailsEntity;

  @ApiProperty({ type: () => AccessRegisterDetailsEntity })
  @ValidateNested()
  @Type(() => AccessRegisterDetailsEntity)
  public details: AccessRegisterDetailsEntity;

  public get newUserId(): string | undefined {
    return this.resourcePath.split('/')[1] || undefined;
  }

  constructor(partial: Partial<AdminUserCreateEntity>) {
    super();
    Object.assign(this, partial);
  }
}
