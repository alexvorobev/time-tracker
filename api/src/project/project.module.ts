import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TrackerService } from 'src/tracker/tracker.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, TrackerService],
  exports: [ProjectService],
  imports: [TrackerService],
})
export class ProjectModule {}
