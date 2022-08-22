import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services';
import { UserModule } from '../user/user.module';
import { UsersService } from '../user/services';
import { PrismaService } from 'src/database/PrismaService';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('JWT_KEY'),
            signOptions: { expiresIn: '3600s' },
          };
        },
        inject: [ConfigService]
      })
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}