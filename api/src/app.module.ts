import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  providers: [PrismaService],
  imports: [UserModule, PrismaModule],
})
export class AppModule {}
