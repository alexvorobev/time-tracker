import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackerDto } from './dto/tracker.dto';
import formatTrackers from './utils/formatTrackers';

@Injectable()
export class TrackerService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: number) {
    const activeTrackers = await this.prisma.tracker.findMany({
      where: {
        createdBy: user,
        stoppedAt: null,
      },
      include: {
        Project: true,
      },
    });

    const latestTracker = await this.prisma.tracker.findFirst({
      where: {
        createdBy: user,
      },
      include: {
        Project: true,
      },
    });

    if (activeTrackers.length === 0 && latestTracker === null) {
      return [];
    }

    return activeTrackers.length > 0 ? formatTrackers(activeTrackers) : formatTrackers([latestTracker]);
  }

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

  private async updateProjectAmount(id: number, trackedTime: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });
    const { total } = project;
    const updatedTotal = total + trackedTime;

    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        total: updatedTotal,
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
    const endTime = dayjs(stoppedAt);
    const amount = +(endTime.diff(tracker.startedAt, 'minutes') / 60).toFixed(4);

    const { title } = await this.updateProjectAmount(project, amount);

    return this.prisma.tracker
      .updateMany({
        where: {
          project,
          createdBy: user,
          stoppedAt: null,
        },
        data: {
          stoppedAt,
          amount,
        },
      })
      .then(() => {
        return {
          project: title,
          tracked: amount,
        };
      })
      .catch((e) => {
        return e;
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

  findByProject(project: number) {
    return this.prisma.tracker.findMany({
      where: {
        project,
      },
    });
  }

  remove(id: number) {
    return this.prisma.tracker.delete({
      where: {
        id,
      },
    });
  }
}
