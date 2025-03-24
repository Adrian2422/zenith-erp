import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public postalCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public buildingNo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public localNo: string;
}
