import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

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

  findAll(createdBy: number) {
    return this.prisma.project.findMany({
      where: {
        createdBy,
      },
    });
  }

  findOne(id: number, createdBy: number) {
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

  remove(id: number) {
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
