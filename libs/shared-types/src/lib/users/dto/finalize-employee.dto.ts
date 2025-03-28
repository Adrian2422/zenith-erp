import { ApiProperty } from '@nestjs/swagger';
import { EmployeeStatus } from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';
import { DecimalPatch } from '../../../../../../apps/server/src/common/classes/decimal-patch';
import { ToFixed } from '../../../../../../apps/server/src/common/decorators/to-fixed.decorator';
import { Decimal } from '@prisma/client/runtime/library';

export class FinalizeEmployeeDto {
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
