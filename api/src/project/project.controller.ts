import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { JwtAuthGuard } from 'src/user/jwt.guard';
import { ProjectGuard } from './project.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProjectGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    const { user } = req;
    return this.projectService.create(createProjectDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProjectGuard)
  findAll(@Req() req: any) {
    const { user } = req;
    return this.projectService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProjectGuard)
  findOne(@Param('id') id: string, @Req() req: any) {
    const { user } = req;
    return this.projectService.findOne(+id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProjectGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() req: any) {
    const { user } = req;
    console.log({ user });
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ProjectGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    const { user } = req;
    console.log({ user });
    return this.projectService.remove(+id);
  }
}
