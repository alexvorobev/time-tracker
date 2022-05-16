import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerController } from './tracker.controller';
import { FragmentService } from 'src/fragment/fragment.service';

@Module({
  controllers: [TrackerController],
  providers: [TrackerService, FragmentService],
  exports: [TrackerService],
})
export class TrackerModule {}
