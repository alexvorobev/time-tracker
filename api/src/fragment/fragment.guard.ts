import { Injectable, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class FragmentGuard extends UserGuard {
  private context: ExecutionContext = null;

  constructor(private readonly projectService: ProjectService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.context = context;
    return super.canActivate(context);
  }

  async handleRequest(err, user) {
    const {
      query: { project: queryProject },
      params: { project: paramsProject, id: fragmentId },
    } = this.context.switchToHttp().getRequest();

    const project = +queryProject || +paramsProject;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (project && !fragmentId) {
      const projectData = await this.projectService.findOne(+project, user.id);

      if (!projectData) {
        throw new NotFoundException();
      }
    }

    return user;
  }
}
