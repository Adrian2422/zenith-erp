import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Settings } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SettingsEntity implements Settings {
  @ApiHideProperty()
  @Exclude()
  public userId: number;

  @ApiHideProperty()
  @Exclude()
  public settingsId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public theme: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public language: string;

  constructor(partial: Partial<SettingsEntity>) {
    Object.assign(this, partial);
  }
}
