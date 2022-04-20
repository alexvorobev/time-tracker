import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jswService: JwtService, private projectService: ProjectService) {}
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    const comparedPassword = await bcrypt.compare(password, result.password);

    if (!comparedPassword) {
      throw new UnauthorizedException("Can't find user with such email or password");
    }

    return {
      token: this.jswService.sign({ userId: result.id }),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { password, email } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.prisma.user
      .create({
        data: {
          ...signUpDto,
          password: hashedPassword,
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            throw new ConflictException('User with such credentials already exists!');
          }
        }

        throw new InternalServerErrorException();
      })
      .then(async ({ id }) => {
        await this.projectService.create({ title: 'Default project' }, id);

        return this.signIn({
          email,
          password,
        });
      });
  }

  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: +userId } });
  }
}
