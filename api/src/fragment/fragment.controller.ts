import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { FragmentService } from './fragment.service';
import { CreateFragmentDto } from './dto/create-fragment.dto';
import { UpdateFragmentDto } from './dto/update-fragment.dto';
import { UserGuard } from 'src/guards/user.guard';
import { FragmentGuard } from './fragment.guard';

@Controller('fragments')
@UseGuards(UserGuard)
export class FragmentController {
  constructor(private readonly fragmentService: FragmentService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(FragmentGuard)
  create(@Body() createFragmentDto: CreateFragmentDto, @Req() req: any) {
    const { user } = req;
    return this.fragmentService.create(createFragmentDto, user.id);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(FragmentGuard)
  findAllForProject(@Query('project') id: string, @Req() req: any) {
    const { user } = req;

    return this.fragmentService.findAllByProject(+id, user.id);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(FragmentGuard)
  findOne(@Param('id') id: string) {
    return this.fragmentService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(FragmentGuard)
  update(@Param('id') id: string, @Body() updateFragmentDto: UpdateFragmentDto) {
    return this.fragmentService.update(+id, updateFragmentDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(FragmentGuard)
  remove(@Param('id') id: string) {
    return this.fragmentService.remove(+id);
  }
}
