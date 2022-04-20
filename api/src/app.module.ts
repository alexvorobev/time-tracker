import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TrackerModule } from './tracker/tracker.module';

@Module({
  providers: [PrismaService],
  imports: [UserModule, PrismaModule, ProjectModule, TrackerModule],
})
export class AppModule {}
