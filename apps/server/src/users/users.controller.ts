import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AddressEntity,
  CreateUserDto,
  SettingsEntity,
  UpdateAddressDto,
  UpdateLanguageDto,
  UpdateThemeDto,
  UserEntity,
} from '@zenith-erp/shared-types';

import { CurrentUser } from '../common/decorators/current-user.decorator';
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

  @Patch('address')
  @ApiOkResponse({ type: AddressEntity })
  public updateUserAddress(@CurrentUser('sub') keycloakId: string, @Body() dto: UpdateAddressDto): Promise<AddressEntity> {
    return this.usersService.updateUserAddress(keycloakId, dto);
  }

  @Patch('language')
  @ApiOkResponse({ type: SettingsEntity })
  public updateUserLanguage(@CurrentUser('sub') keycloakId: string, @Body() dto: UpdateLanguageDto): Promise<SettingsEntity> {
    return this.usersService.updateUserLanguage(keycloakId, dto);
  }

  @Patch('theme')
  @ApiOkResponse({ type: SettingsEntity })
  public updateUserTheme(@CurrentUser('sub') keycloakId: string, @Body() dto: UpdateThemeDto): Promise<SettingsEntity> {
    return this.usersService.updateUserTheme(keycloakId, dto);
  }
}
