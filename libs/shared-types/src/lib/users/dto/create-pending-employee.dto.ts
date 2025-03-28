import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString, IsUUID
} from 'class-validator';

export class CreatePendingEmployeeDto {
  @ApiProperty()
  @IsUUID()
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
}
