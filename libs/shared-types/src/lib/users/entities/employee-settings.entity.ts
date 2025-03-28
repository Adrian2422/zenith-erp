import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EmployeeSettings } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmployeeSettingsEntity implements EmployeeSettings {
  @ApiHideProperty()
  @Exclude()
  public employeeId: string;

  @ApiHideProperty()
  @Exclude()
  public id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public theme: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public language: string;

  @ApiHideProperty()
  @Exclude()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<EmployeeSettingsEntity>) {
    Object.assign(this, partial);
  }
}
