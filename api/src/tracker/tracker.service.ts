import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackerDto } from './dto/tracker.dto';

@Injectable()
export class TrackerService {
  constructor(private prisma: PrismaService) {}

  private create(project: number, user: number) {
    return this.prisma.tracker.create({
      data: {
        project,
        createdBy: user,
        amount: 0,
      },
      include: {
        Project: true,
      },
    });
  }

  private async stop(project: number, user: number) {
    const tracker = await this.prisma.tracker.findFirst({
      where: {
        project,
        createdBy: user,
        stoppedAt: null,
      },
    });
    const stoppedAt = new Date();
    const start = dayjs(tracker.startedAt);
    const amount = start.diff(stoppedAt, 'minutes') / 60;

    //TODO: Add project amount affection

    return this.prisma.tracker.updateMany({
      where: {
        project,
        createdBy: user,
        stoppedAt: null,
      },
      data: {
        stoppedAt,
        amount,
      },
    });
  }

  async toggle(trackerDto: TrackerDto, user: number) {
    const { project } = trackerDto;
    const isExist = await this.prisma.tracker.count({
      where: {
        project,
        createdBy: user,
        stoppedAt: null,
      },
    });

    return isExist ? this.stop(project, user) : this.create(project, user);
  }
}
