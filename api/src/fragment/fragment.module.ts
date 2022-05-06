import { Module } from '@nestjs/common';
import { FragmentService } from './fragment.service';
import { FragmentController } from './fragment.controller';
import { ProjectService } from 'src/project/project.service';
import { TrackerService } from 'src/tracker/tracker.service';

@Module({
  controllers: [FragmentController],
  providers: [FragmentService, TrackerService, ProjectService],
})
export class FragmentModule {}
