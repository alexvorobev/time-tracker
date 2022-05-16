import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';

import { Modals } from 'controllers/modals/types';
import { useModal } from 'controllers/modals/useModal';
import { useProjects } from 'controllers/projects/useProjects';

import TrackerButton from './components/TrackerButton';

const AddButton = styled(Button)(() => ({
  width: '100%',
  height: 40,
  position: 'absolute',
  left: 0,
  bottom: 0,
  transition: '.3s opacity',
  zIndex: 1,
  maxWidth: '100%',
}));

const ListWrapper = styled('div')<{ isEmpty: boolean }>(({ isEmpty }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  position: 'relative',
  transition: '.6s padding',
  [`${AddButton}`]: {
    opacity: isEmpty ? 1 : 0,
  },

  ':hover': {
    paddingBottom: 48,

    [`${AddButton}`]: {
      opacity: 1,
    },
  },
}));

const TrackersList = () => {
  const { trackers, projects } = useProjects();
  const { openModal } = useModal();
  const isAddButtonDisabled = trackers.findIndex((item) => !item.stoppedAt) >= 0 || projects.length === 0;

  return (
    <ListWrapper isEmpty={trackers.length === 0}>
      {trackers.map(({ startedAt, stoppedAt, project, projectTitle }) => (
        <TrackerButton
          key={project}
          isActive={stoppedAt == null}
          projectId={project}
          projectTitle={projectTitle}
          startedAt={startedAt}
        />
      ))}
      <AddButton onClick={() => openModal(Modals.AddTrackerModal)} disabled={isAddButtonDisabled}>
        Add tracker
      </AddButton>
    </ListWrapper>
  );
};

export default TrackersList;
