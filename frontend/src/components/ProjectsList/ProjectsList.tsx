import { FC } from 'react';

import { Project } from 'controllers/projects/types';

import ProjectItem from './components/ProjectItem';

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
