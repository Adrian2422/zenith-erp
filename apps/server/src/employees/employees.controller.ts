import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePendingEmployeeDto,
  EmployeeEntity,
  EmployeeSettingsEntity,
  FinalizeEmployeeDto,
  PendingEmployeeEntity,
  UpdateLanguageDto,
  UpdateThemeDto,
} from '@zenith-erp/shared-types';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@ApiOAuth2(['roles', 'profile'])
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOkResponse({ type: EmployeeEntity, isArray: true })
  public findAll(): Promise<EmployeeEntity[]> {
    return this.employeesService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: PendingEmployeeEntity })
  public async create(@Body() data: CreatePendingEmployeeDto): Promise<PendingEmployeeEntity> {
    return this.employeesService.create(data);
  }

  @Post('finalize')
  @ApiCreatedResponse({ type: EmployeeEntity })
  public async finalize(@Param('id') id: string, @Body() data: FinalizeEmployeeDto): Promise<EmployeeEntity> {
    return this.employeesService.finalize(id, data);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  public async findOne(@Param('id') id: string): Promise<EmployeeEntity> {
    return this.employeesService.findOne(id);
  }

  //Todo: handle pending and normal employee return type
  @Delete(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  public async remove(@Param('id') id: string): Promise<EmployeeEntity> {
    return await this.employeesService.remove(id);
  }

  @Patch('language')
  @ApiOkResponse({ type: EmployeeSettingsEntity })
  public updateUserLanguage(@CurrentUser('sub') keycloakId: string, @Body() dto: UpdateLanguageDto): Promise<EmployeeSettingsEntity> {
    return this.employeesService.updateUserLanguage(keycloakId, dto);
  }

  @Patch('theme')
  @ApiOkResponse({ type: EmployeeSettingsEntity })
  public updateUserTheme(@CurrentUser('sub') keycloakId: string, @Body() dto: UpdateThemeDto): Promise<EmployeeSettingsEntity> {
    return this.employeesService.updateUserTheme(keycloakId, dto);
  }
}
