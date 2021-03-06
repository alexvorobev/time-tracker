import { Project, Tracker } from '@prisma/client';

interface TrackerItem extends Tracker {
  Project: Project;
}

const formatTrackers = (data: TrackerItem[]) =>
  data.length > 0
    ? data.map(({ startedAt, stoppedAt, project, Project: { title } }) => ({
        project,
        projectTitle: title,
        startedAt,
        stoppedAt,
      }))
    : [];

export default formatTrackers;
