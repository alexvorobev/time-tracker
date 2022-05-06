import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TrackerService } from 'src/tracker/tracker.service';
import { FragmentService } from 'src/fragment/fragment.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, TrackerService, FragmentService],
  exports: [ProjectService],
})
export class ProjectModule {}
