import { ClassSerializerInterceptor, ConflictException, Inject, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import {
  AddressEntity,
  CreateUserDto,
  SettingsEntity,
  UpdateAddressDto,
  UpdateLanguageDto,
  UpdateThemeDto,
  UserEntity,
} from '@zenith-erp/shared-types';
import { plainToInstance } from 'class-transformer';
import { CustomPrismaService } from 'nestjs-prisma';

import { type ExtendedPrismaClient } from '../app/prisma.extension';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UsersService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  public async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.client.user.findUnique({
      where: { keycloakId: data.keycloakId },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.prismaService.client.user.create({
      data: {
        ...data,
        address: {
          create: {},
        },
        settings: {
          create: {},
        },
      },
    });

    return plainToInstance(UserEntity, newUser);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.client.user.findMany();

    return users.map((u) => plainToInstance(UserEntity, u));
  }

  public findOne(keycloakId: string): UserEntity {
    const user = this.prismaService.client.user.findUnique({
      where: { keycloakId },
      include: {
        address: true,
        settings: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ${keycloakId} does not exist.`);
    }

    return plainToInstance(UserEntity, user);
  }

  public async remove(keycloakId: string): Promise<UserEntity> {
    const user = await this.prismaService.client.user.delete({
      where: { keycloakId },
    });

    if (!user) {
      throw new NotFoundException(`User with ${keycloakId} does not exist.`);
    }

    return plainToInstance(UserEntity, user);
  }

  public async updateUserLanguage(keycloakId: string, dto: UpdateLanguageDto): Promise<SettingsEntity> {
    const user = await this.prismaService.client.user.findUnique({ where: { keycloakId }, include: { settings: true } });

    if (!user) {
      throw new NotFoundException(`User with ${keycloakId} does not exist.`);
    }

    if (user.settings) {
      return await this.prismaService.client.settings
        .update({
          where: { userId: user.userId },
          data: {
            language: dto.language,
          },
        })
        .then((settings) => plainToInstance(SettingsEntity, settings));
    } else {
      return await this.prismaService.client.settings
        .create({
          data: {
            language: dto.language,
            theme: null,
            user: {
              connect: {
                userId: user.userId,
              },
            },
          },
        })
        .then((settings) => plainToInstance(SettingsEntity, settings));
    }
  }

  public async updateUserTheme(keycloakId: string, dto: UpdateThemeDto): Promise<SettingsEntity> {
    const user = await this.prismaService.client.user.findUnique({ where: { keycloakId }, include: { settings: true } });

    if (!user) {
      throw new NotFoundException(`User with ${keycloakId} does not exist.`);
    }

    if (user.settings) {
      return await this.prismaService.client.settings
        .update({
          where: { userId: user.userId },
          data: {
            theme: dto.theme,
          },
        })
        .then((settings) => plainToInstance(SettingsEntity, settings));
    } else {
      return await this.prismaService.client.settings
        .create({
          data: {
            theme: dto.theme,
            language: null,
            user: {
              connect: {
                userId: user.userId,
              },
            },
          },
        })
        .then((settings) => plainToInstance(SettingsEntity, settings));
    }
  }

  public async updateUserAddress(keycloakId: string, dto: UpdateAddressDto): Promise<AddressEntity> {
    const user = await this.prismaService.client.user.findUnique({ where: { keycloakId }, include: { address: true } });

    if (!user) {
      throw new NotFoundException(`User with ${keycloakId} does not exist.`);
    }

    if (user.address) {
      return await this.prismaService.client.address
        .update({
          where: { userId: user.userId },
          data: {
            ...dto,
          },
        })
        .then((address) => plainToInstance(AddressEntity, address));
    } else {
      return await this.prismaService.client.address
        .create({
          data: {
            ...dto,
            user: {
              connect: {
                userId: user.userId,
              },
            },
          },
        })
        .then((address) => plainToInstance(AddressEntity, address));
    }
  }
}
