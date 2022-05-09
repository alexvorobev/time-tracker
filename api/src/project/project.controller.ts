import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectGuard } from './project.guard';
import { FragmentGuard } from 'src/fragment/fragment.guard';
import { FragmentService } from 'src/fragment/fragment.service';
import { UserGuard } from 'src/guards/user.guard';

@Controller('projects')
@UseGuards(UserGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService, private readonly fragmentsService: FragmentService) {}

  @Post()
  @UseGuards(ProjectGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    const { user } = req;
    return this.projectService.create(createProjectDto, user.id);
  }

  @Get()
  @UseGuards(ProjectGuard)
  findAll(@Req() req: any) {
    const { user } = req;
    return this.projectService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(ProjectGuard)
  findOne(@Param('id') id: string, @Req() req: any) {
    const { user } = req;
    return this.projectService.findOne(+id, user.id);
  }

  @Get(':project/fragments')
  @UseGuards(FragmentGuard)
  findAllByProject(@Param('project') id: string, @Req() req: any) {
    const { user } = req;
    return this.fragmentsService.findAll(+id, user.id);
  }

  @Patch(':id')
  @UseGuards(ProjectGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(ProjectGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
