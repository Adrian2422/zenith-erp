import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KeycloakEventBaseEntity {
  @ApiProperty({ description: 'Event id' })
  @IsString()
  @IsNotEmpty()
  public id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public time: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realmId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public realmName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public operationType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public resourcePath: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public uid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public resourceType: string;
}
