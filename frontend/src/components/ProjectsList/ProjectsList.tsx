import { FC, useCallback, useState } from 'react';

import { Project } from 'controllers/projects/types';
import AddProjectModal from 'components/modals/AddProjectModal';
import DeleteProjectModal from 'components/modals/DeleteProjectModal';
import { useModal } from 'controllers/modals/useModal';
import { Modals } from 'controllers/modals/types';

import ProjectItem from './components/ProjectItem';

interface Props {
  projects?: Project[];
}

const ProjectsList: FC<Props> = ({ projects }) => {
  const [actionItemId, setActionItemId] = useState<number>();
  const renderedAddModal = <AddProjectModal />;
  const renderedDeleteModal = <DeleteProjectModal id={actionItemId} />;
  const { openModal } = useModal();

  const onDeleteItem = useCallback(
    (id: number) => {
      setActionItemId(id);
      openModal(Modals.DeleteProjectModal);
    },
    [openModal],
  );

  return (
    <>
      <ProjectItem isHeader />
      {projects?.map((item) => (
        <ProjectItem data={item} key={item.id} onDelete={onDeleteItem} />
      ))}
      {renderedAddModal}
      {renderedDeleteModal}
    </>
  );
};

export default ProjectsList;
