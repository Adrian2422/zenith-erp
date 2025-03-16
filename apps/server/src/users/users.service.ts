import { ClassSerializerInterceptor, ConflictException, Inject, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomPrismaService } from 'nestjs-prisma';

import { type ExtendedPrismaClient } from '../app/prisma.extension';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

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
        personalInfo: {
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

  public findOne(id: number): UserEntity {
    const user = this.prismaService.client.user.findUnique({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
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
}
