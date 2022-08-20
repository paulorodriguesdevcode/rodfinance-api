import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserController } from './controllers';
import { UserService } from './services';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
