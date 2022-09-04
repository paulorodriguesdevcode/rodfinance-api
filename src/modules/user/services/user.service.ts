import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilsService } from 'src/common/utils.service';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from '../dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserDTO[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        password: false,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<UserDTO | null> {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        password: false,
        updatedAt: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<UserDTO> {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },      
    }) as UserDTO;
  }

  async create(user: UserDTO): Promise<UserDTO> {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    user.password = UtilsService.generateHash(user.password);

    return await this.prismaService.user.create({ 
      data: user,
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        password: false,
        updatedAt: true,
      }, 
    });
  }

  async update(id: string, user: UserDTO): Promise<UserDTO> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: new UserDTO(user),
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        password: false,
        updatedAt: true,
      },
    });
  }

  async delete(id: string): Promise<UserDTO> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        password: false,
        updatedAt: true,
      },
    });
  }
}
