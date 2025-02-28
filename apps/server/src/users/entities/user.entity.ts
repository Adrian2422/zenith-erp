import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Permissions, Roles, Status, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public email: string;

  @ApiHideProperty()
  @Exclude()
  public password: string;

  @ApiProperty()
  public role: Roles;

  @ApiProperty()
  public permissions: Permissions[];

  @ApiProperty()
  public status: Status;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
