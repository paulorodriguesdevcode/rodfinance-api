import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from '../dto';
import { UsersService } from '../services/user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<UserDTO | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() user:UserDTO): Promise<UserDTO | null> {
    return this.usersService.update(id, user);
  }

  @Post()
  create(@Body() user:UserDTO): Promise<UserDTO> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  delete(@Param('id') id:string): Promise<UserDTO> {
    return this.usersService.delete(id);
  }
}
