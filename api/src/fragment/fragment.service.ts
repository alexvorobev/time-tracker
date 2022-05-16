import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFragmentDto } from './dto/create-fragment.dto';
import { FindFragmentsDto } from './dto/find-fragments.dto';
import { UpdateFragmentDto } from './dto/update-fragment.dto';
import getDateByPeriod from './utils/getDateByPeriod';

@Injectable()
export class FragmentService {
  constructor(private prisma: PrismaService) {}
  create(createFragmentDto: CreateFragmentDto, createdBy: number) {
    if (createFragmentDto.amount <= 0) return;

    return this.prisma.fragment.create({
      data: {
        ...createFragmentDto,
        createdBy,
      },
    });
  }

  async findAll({ createdBy, project, period }: FindFragmentsDto) {
    const dateFrom = getDateByPeriod(period);
    const dateFilter = dateFrom
      ? {
          date: {
            gte: new Date(dateFrom),
          },
        }
      : {};

    return this.prisma.fragment.findMany({
      where: {
        ...({ project } ?? {}),
        createdBy,
        ...dateFilter,
      },
      include: {
        Project: {
          select: {
            id: true,
            title: true,
          },
        },
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
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
