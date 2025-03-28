import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Employee, EmployeeStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Transform, Type } from 'class-transformer';
import { IsDecimal, IsEnum, IsISO8601, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { DepartmentEntity } from './department.entity';
import { EmployeeSettingsEntity } from './employee-settings.entity';
import { DecimalPatch } from '../../../../../../apps/server/src/common/classes/decimal-patch';
import { ToFixed } from '../../../../../../apps/server/src/common/decorators/to-fixed.decorator';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  @IsUUID()
  public id: string;

  @ApiProperty()
  @IsString()
  public keycloakId: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string | null;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiHideProperty()
  @Exclude()
  departmentId: string;

  @ApiProperty()
  @Type(() => DecimalPatch)
  @ToFixed()
  salary: Decimal;

  @ApiProperty()
  @IsISO8601()
  hireDate: Date;

  @ApiProperty()
  @IsISO8601()
  @IsOptional()
  terminationDate: Date | null;

  @ApiProperty()
  @IsEnum({ enum: EmployeeStatus })
  status: EmployeeStatus;

  @ApiHideProperty()
  @Exclude()
  public createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  public updatedAt: Date;

  @ApiProperty({ type: () => DepartmentEntity })
  @ValidateNested()
  @Type(() => DepartmentEntity)
  public department: DepartmentEntity;

  @ApiProperty({ type: () => EmployeeSettingsEntity })
  @ValidateNested()
  @Type(() => EmployeeSettingsEntity)
  public settings: EmployeeSettingsEntity;

  constructor(partial: Partial<EmployeeEntity>) {
    Object.assign(this, partial);
  }
}
