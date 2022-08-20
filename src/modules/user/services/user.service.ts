import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from '../dto/UserDTO';

@Injectable()
export class UserService {

  constructor( private prismaService: PrismaService){}

  async findAll(): Promise<UserDTO[]> {
    return await this.prismaService.user.findMany()
  }

  async findOne(id: string):Promise<UserDTO | null> {
    return await this.prismaService.user.findFirst({
      where: {
        id
      }
    })
  }

  async create(user: UserDTO): Promise<UserDTO> {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        email: user.email
      }
    })

    if(userAlreadyExists){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    
    return await this.prismaService.user.create({data: user })
  }

  async update(id: string, user: UserDTO): Promise<UserDTO> {
    return await this.prismaService.user.update({
      where:  {
        id
      },
      data: new UserDTO(user)
    })   
  }

  async delete(id: string): Promise<UserDTO> {
    return await this.prismaService.user.delete({
      where: {
        id
      }
    })
  }


}
