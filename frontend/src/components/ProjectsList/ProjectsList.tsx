import { FC } from 'react';

export type ProjectItem = {
  id: number;
  name: string;
  today: number;
  week: number;
  month: number;
  total: number;
};

interface Props {
  projects?: ProjectItem[];
}

const ProjectsList: FC<Props> = ({ projects }) => {
  return <>Projects page</>;
};

export default ProjectsList;
