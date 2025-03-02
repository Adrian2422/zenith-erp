import {
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomPrismaService } from 'nestjs-prisma';

import { type ExtendedPrismaClient } from '../app/prisma.extension';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UsersService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}
  public create(createUserDto: CreateUserDto): UserEntity {
    const user = this.prismaService.client.user.create({ data: createUserDto });

    return plainToInstance(UserEntity, user);
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

  public update(id: number, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.prismaService.client.user.update({
      where: { userId: id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }

    return plainToInstance(UserEntity, user);
  }

  public remove(id: number): UserEntity {
    const user = this.prismaService.client.user.delete({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }

    return plainToInstance(UserEntity, user);
  }
}
