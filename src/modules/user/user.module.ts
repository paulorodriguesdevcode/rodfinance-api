import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserController } from './controllers';
import { UsersService } from './services';

@Module({
    controllers: [UserController],
    providers: [UsersService, PrismaService],
})
export class UserModule {}
