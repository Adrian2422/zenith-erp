import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { AddressEntity } from './address.entity';
import { SettingsEntity } from './settings.entity';

export class UserEntity implements User {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public keycloakId: string;

  @ApiHideProperty()
  @Exclude()
  public createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  public updatedAt: Date;

  @ApiProperty({ type: () => SettingsEntity })
  @ValidateNested()
  @Type(() => SettingsEntity)
  public settings: SettingsEntity;

  @ApiProperty({ type: () => AddressEntity })
  @ValidateNested()
  @Type(() => AddressEntity)
  public address: AddressEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
