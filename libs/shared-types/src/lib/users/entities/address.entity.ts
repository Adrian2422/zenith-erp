import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AddressEntity implements Address {
  @ApiHideProperty()
  @Exclude()
  public userId: number;

  @ApiHideProperty()
  @Exclude()
  public addressId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public country: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public city: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public street: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public postalCode: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public buildingNo: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public localNo: string | null;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
