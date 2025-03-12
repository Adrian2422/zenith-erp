import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WebhookEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public id: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public enabled: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public createdBy: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public createdAt: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realm: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  public eventTypes: string[];
}
