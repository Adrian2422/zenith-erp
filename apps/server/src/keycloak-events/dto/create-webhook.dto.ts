import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateWebhookDto {
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
  public secret: string;

  @ApiProperty()
  @IsArray({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  public eventTypes: string[];
}
