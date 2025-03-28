import { ApiProperty } from '@nestjs/swagger';
import { PendingEmployee } from '@prisma/client';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class PendingEmployeeEntity implements PendingEmployee {
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
  @IsEmail()
  email: string;

  constructor(partial: Partial<PendingEmployeeEntity>) {
    Object.assign(this, partial);
  }
}
