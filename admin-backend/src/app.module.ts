import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [PrismaModule, UserModule, ApplicationModule, PermissionModule],
})
export class AppModule {}
