import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserEntity } from '@zenith-erp/shared-types';

import { UsersService } from './users.service';

@ApiTags('users')
@ApiOAuth2(['roles', 'profile'])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  public findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  public create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(data);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  public findOne(@Param('id') id: string): UserEntity {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  public async remove(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.remove(id);
  }
}
