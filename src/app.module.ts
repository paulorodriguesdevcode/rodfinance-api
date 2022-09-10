import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MovementModule } from './modules/movement/movement.module';

@Module({
  imports: [AuthModule, UserModule, MovementModule],
})
export class AppModule {}
