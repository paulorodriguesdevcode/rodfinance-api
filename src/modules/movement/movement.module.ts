import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/PrismaService';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services';
import { UserModule } from '../user/user.module';
import { MovementController } from './controllers';
import { MovementService } from './services';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [MovementController],
  providers: [MovementService, PrismaService, AuthService, JwtService],
})
export class MovementModule {}
