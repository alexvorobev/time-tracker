export type Project = {
  id: number;
  title: string;
  today: number;
  week: number;
  month: number;
  total: number;
};

export type Tracker = {
  project: number;
  projectTitle: string;
  startedAt: string;
  stoppedAt?: string;
};
