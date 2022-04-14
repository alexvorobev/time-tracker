import { FC } from 'react';

import ProjectItem from './components/ProjectItem';

export type Project = {
  id: number;
  name: string;
  today: number;
  week: number;
  month: number;
  total: number;
};

interface Props {
  projects?: Project[];
}

const ProjectsList: FC<Props> = ({ projects }) => {
  return (
    <>
      <ProjectItem isHeader />
      {projects?.map((item) => (
        <ProjectItem data={item} key={item.id} />
      ))}
    </>
  );
};

export default ProjectsList;
