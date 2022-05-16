import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { UserGuard } from 'src/guards/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(UserGuard)
  me(@Req() req: any) {
    const {
      user: { id, email, firstName, lastName },
    } = req;

    return {
      id,
      email,
      firstName,
      lastName,
    };
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Post('/new')
  @UsePipes(ValidationPipe)
  singUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }
}
