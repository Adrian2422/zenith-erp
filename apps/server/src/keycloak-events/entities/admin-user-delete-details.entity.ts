import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminUserDeleteDetailsEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public userId: string;

  constructor(partial: Partial<AdminUserDeleteDetailsEntity>) {
    Object.assign(this, partial);
  }
}
