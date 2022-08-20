import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDTO } from '../dto/UserDTO';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<UserDTO | null> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() user:UserDTO): Promise<UserDTO | null> {
    return this.userService.update(id, user);
  }

  @Post()
  create(@Body() user:UserDTO): Promise<UserDTO> {
    return this.userService.create(user);
  }

  @Delete(':id')
  delete(@Param('id') id:string): Promise<UserDTO> {
    return this.userService.delete(id);
  }
}
