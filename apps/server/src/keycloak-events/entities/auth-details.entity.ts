import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDetailsEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realmId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public clientId: string;

  @ApiProperty({ description: 'Authenticated user id' })
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public ipAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public sessionId?: string;

  constructor(partial: Partial<AuthDetailsEntity>) {
    Object.assign(this, partial);
  }
}
