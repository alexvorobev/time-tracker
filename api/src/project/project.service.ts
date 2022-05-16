import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackerService } from 'src/tracker/tracker.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService, private trackerService: TrackerService) {}

  create(createProjectDto: CreateProjectDto, createdBy: number) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        total: 0,
        createdBy,
      },
      include: {
        Tracker: true,
      },
    });
  }

  async findAll(createdBy: number) {
    const projects = await this.prisma.project.findMany({
      where: {
        createdBy,
      },
    });

    return projects;
  }

  findOne(id: number, createdBy?: number) {
    return this.prisma.project.findFirst({
      where: {
        id,
        createdBy,
      },
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  async remove(id: number) {
    const trackers = await this.trackerService.findByProject(id);
    await Promise.all(trackers.map((item) => this.trackerService.remove(item.id)));

    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
