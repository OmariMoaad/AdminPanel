import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module'; // <== Ajoute cette ligne

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ApplicationModule,
    PermissionModule,
    AuthModule, // <== Et ajoute-le ici
  ],
})
export class AppModule {}
