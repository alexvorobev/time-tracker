import { FC } from 'react';

import { Project } from 'controllers/projects/types';
import AddProjectModal from 'components/modals/AddProjectModal';

import ProjectItem from './components/ProjectItem';

interface Props {
  projects?: Project[];
}

const ProjectsList: FC<Props> = ({ projects }) => {
  const renderedModal = <AddProjectModal />;

  return (
    <>
      <ProjectItem isHeader />
      {projects?.map((item) => (
        <ProjectItem data={item} key={item.id} />
      ))}
      {renderedModal}
    </>
  );
};

export default ProjectsList;
