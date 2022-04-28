import { FC, useState, useCallback } from 'react';

import { Project } from 'controllers/projects/types';
import AddProjectModal from 'components/modals/AddProjectModal';
import DeleteProjectModal from 'components/modals/DeleteProjectModal';
import { useModal } from 'controllers/modals/useModal';
import { Modals } from 'controllers/modals/types';
import EditProjectModal from 'components/modals/EditProjectModal';

import ProjectItem from './components/ProjectItem';

interface Props {
  projects?: Project[];
}

const ProjectsList: FC<Props> = ({ projects }) => {
  const [actionItemId, setActionItemId] = useState<number>();
  const renderedAddModal = <AddProjectModal />;
  const renderedEditModal = <EditProjectModal id={actionItemId} />;
  const renderedDeleteModal = <DeleteProjectModal id={actionItemId} />;
  const { openModal } = useModal();

  const rowActionClick = useCallback(
    (id: number, modal: Modals) => {
      setActionItemId(id);
      openModal(modal);
    },
    [openModal],
  );

  return (
    <>
      <ProjectItem isHeader />
      {projects?.map((item) => (
        <ProjectItem
          data={item}
          key={item.id}
          onEdit={(id) => rowActionClick(id, Modals.EditProjectModal)}
          onDelete={(id) => rowActionClick(id, Modals.DeleteProjectModal)}
        />
      ))}
      {renderedAddModal}
      {renderedEditModal}
      {renderedDeleteModal}
    </>
  );
};

export default ProjectsList;
