import { Controller, Post, Body, Req, UseGuards, Get, Sse } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerDto } from './dto/tracker.dto';
import { UserGuard } from 'src/guards/user.guard';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createTrackerDto: TrackerDto, @Req() req: any) {
    const { user } = req;

    return this.trackerService.toggle(createTrackerDto, user.id);
  }

  @Sse('/stream')
  stream() {
    return this.trackerService.connect();
  }

  @Get()
  @UseGuards(UserGuard)
  list(@Req() req: any) {
    const { user } = req;

    return this.trackerService.findAll(user.id);
  }
}
