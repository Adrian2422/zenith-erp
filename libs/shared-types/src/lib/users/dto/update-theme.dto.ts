import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateThemeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public theme: string;
}
