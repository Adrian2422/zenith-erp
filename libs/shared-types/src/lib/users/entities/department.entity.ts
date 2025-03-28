import { ApiProperty } from '@nestjs/swagger';
import { Department } from '@prisma/client';
import { IsString, IsUUID } from 'class-validator';

export class DepartmentEntity implements Department {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  constructor(partial: Partial<DepartmentEntity>) {
    Object.assign(this, partial);
  }
}
