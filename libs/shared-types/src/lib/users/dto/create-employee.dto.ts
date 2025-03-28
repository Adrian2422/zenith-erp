import { ApiProperty } from '@nestjs/swagger';
import { EmployeeStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { DecimalPatch } from '../../../../../../apps/server/src/common/classes/decimal-patch';
import { ToFixed } from '../../../../../../apps/server/src/common/decorators/to-fixed.decorator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public keycloakId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty()
  @Type(() => DecimalPatch)
  @ToFixed()
  @IsNotEmpty()
  salary: Decimal;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  hireDate: string;

  @ApiProperty()
  @IsEnum({ enum: EmployeeStatus })
  @IsNotEmpty()
  status: EmployeeStatus;
}
