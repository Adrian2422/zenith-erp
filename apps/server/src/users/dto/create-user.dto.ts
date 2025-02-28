import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsNotEmpty()
  public role: Roles;

}
