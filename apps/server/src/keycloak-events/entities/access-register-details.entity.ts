import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AccessRegisterDetailsEntity {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'auth_method' })
  public authMethod?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'auth_type' })
  public authType?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'register_method' })
  public registerMethod?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'last_name' })
  public lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'redirect_uri' })
  public redirectUri?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'first_name' })
  public firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'code_id' })
  public codeId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'email' })
  public email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose({ name: 'username' })
  public username?: string;

  constructor(partial: Partial<AccessRegisterDetailsEntity>) {
    Object.assign(this, partial);
  }
}
