import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AccessRegisterDetailsEntity } from './access-register-details.entity';
import { AuthDetailsEntity } from './auth-details.entity';

export class AccessRegisterEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public time: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realmId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realmName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public uid: string;

  @ApiProperty({ type: () => AuthDetailsEntity })
  @ValidateNested()
  @Type(() => AuthDetailsEntity)
  public authDetails: AuthDetailsEntity;

  @ApiProperty({ type: () => AccessRegisterDetailsEntity })
  @ValidateNested()
  @Type(() => AccessRegisterDetailsEntity)
  public details: AccessRegisterDetailsEntity;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public type: string;

  constructor(partial: Partial<AccessRegisterEntity>) {
    Object.assign(this, partial);
  }
}
