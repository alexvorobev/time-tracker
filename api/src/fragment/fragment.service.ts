import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFragmentDto } from './dto/create-fragment.dto';
import { UpdateFragmentDto } from './dto/update-fragment.dto';

@Injectable()
export class FragmentService {
  constructor(private prisma: PrismaService) {}
  create(createFragmentDto: CreateFragmentDto, createdBy: number) {
    return this.prisma.fragment.create({
      data: {
        ...createFragmentDto,
        createdBy,
      },
    });
  }

  findAllByProject(project: number, createdBy: number) {
    return this.prisma.fragment.findMany({
      where: {
        project,
        createdBy,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.fragment.findMany({
      where: {
        id,
      },
    });
  }

  update(id: number, updateFragmentDto: UpdateFragmentDto) {
    return this.prisma.fragment.update({
      where: {
        id,
      },
      data: {
        ...updateFragmentDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.fragment.delete({
      where: {
        id,
      },
    });
  }
}
