import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
