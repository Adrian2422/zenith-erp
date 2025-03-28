import { ClassSerializerInterceptor, ConflictException, Inject, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import {
  CreatePendingEmployeeDto,
  EmployeeEntity,
  EmployeeSettingsEntity,
  FinalizeEmployeeDto,
  PendingEmployeeEntity,
  UpdateLanguageDto,
  UpdateThemeDto,
} from '@zenith-erp/shared-types';
import { plainToInstance } from 'class-transformer';
import { CustomPrismaService } from 'nestjs-prisma';

import { type ExtendedPrismaClient } from '../app/prisma.extension';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class EmployeesService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  public async create(data: CreatePendingEmployeeDto): Promise<PendingEmployeeEntity> {
    const employee = await this.prismaService.client.pendingEmployee.findUnique({
      where: { keycloakId: data.keycloakId },
    });

    if (employee) {
      throw new ConflictException('Employee already exists');
    }

    const newEmployee = await this.prismaService.client.pendingEmployee.create({
      data: {
        ...data,
      },
    });

    return plainToInstance(PendingEmployeeEntity, newEmployee);
  }

  public async finalize(id: string, data: FinalizeEmployeeDto): Promise<EmployeeEntity> {
    const pendingEmployee = await this.prismaService.client.pendingEmployee.findUnique({
      where: { id },
    });

    if (!pendingEmployee) {
      throw new NotFoundException(`Pending employee with ${id} does not exist.`);
    }

    const newEmployee = await this.prismaService.client.employee.create({
      data: {
        ...pendingEmployee,
        ...data,
      },
    });

    return plainToInstance(EmployeeEntity, newEmployee);
  }

  public async findAll(): Promise<EmployeeEntity[]> {
    const employees = await this.prismaService.client.employee.findMany();
    console.log(employees);
    return employees.map((u) => plainToInstance(EmployeeEntity, u));
  }

  public async findOne(keycloakId: string): Promise<EmployeeEntity> {
    const employee = await this.prismaService.client.employee.findUnique({
      where: { keycloakId },
      include: {
        settings: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ${keycloakId} does not exist.`);
    }

    return plainToInstance(EmployeeEntity, employee);
  }

  public async remove(keycloakId: string): Promise<EmployeeEntity> {
    const pendingEmployee = await this.prismaService.client.pendingEmployee.delete({
      where: { keycloakId },
    });

    if (pendingEmployee) {
      return plainToInstance(EmployeeEntity, pendingEmployee);
    }

    const employee = await this.prismaService.client.employee.delete({
      where: { keycloakId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ${keycloakId} does not exist.`);
    }

    return plainToInstance(EmployeeEntity, employee);
  }

  public async updateUserLanguage(keycloakId: string, dto: UpdateLanguageDto): Promise<EmployeeSettingsEntity> {
    const employee = await this.prismaService.client.employee.findUnique({ where: { keycloakId }, include: { settings: true } });

    if (!employee) {
      throw new NotFoundException(`Employee with ${keycloakId} does not exist.`);
    }

    if (employee.settings) {
      return await this.prismaService.client.employeeSettings
        .update({
          where: { employeeId: employee.id },
          data: {
            language: dto.language,
          },
        })
        .then((settings) => plainToInstance(EmployeeSettingsEntity, settings));
    } else {
      return await this.prismaService.client.employeeSettings
        .create({
          data: {
            language: dto.language,
            theme: null,
            employee: {
              connect: {
                id: employee.id,
              },
            },
          },
        })
        .then((settings) => plainToInstance(EmployeeSettingsEntity, settings));
    }
  }

  public async updateUserTheme(keycloakId: string, dto: UpdateThemeDto): Promise<EmployeeSettingsEntity> {
    const employee = await this.prismaService.client.employee.findUnique({ where: { keycloakId }, include: { settings: true } });

    if (!employee) {
      throw new NotFoundException(`Employee with ${keycloakId} does not exist.`);
    }

    if (employee.settings) {
      return await this.prismaService.client.employeeSettings
        .update({
          where: { employeeId: employee.id },
          data: {
            theme: dto.theme,
          },
        })
        .then((settings) => plainToInstance(EmployeeSettingsEntity, settings));
    } else {
      return await this.prismaService.client.employeeSettings
        .create({
          data: {
            theme: dto.theme,
            language: null,
            employee: {
              connect: {
                id: employee.id,
              },
            },
          },
        })
        .then((settings) => plainToInstance(EmployeeSettingsEntity, settings));
    }
  }
}
