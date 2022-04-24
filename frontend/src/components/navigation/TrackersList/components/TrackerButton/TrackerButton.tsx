import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { useProjects } from 'controllers/projects/useProjects';
import floatToTime from 'utils/floatToTime';

import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/StopIcon';

interface Props {
  projectId: number;
  projectTitle: string;
  startedAt: string;
  isActive?: boolean;
}

const TrackerWrapper = styled('div')<Pick<Props, 'isActive'>>(({ isActive }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'auto 48px',
  columnGap: 16,
  width: '100%',
  background: isActive ? '#6FD273' : '#F3F4F6',
  color: isActive ? 'white' : 'inherit',
  borderRadius: 6,
  padding: 12,
  zIndex: 2,
  minWidth: 1,
  maxWidth: '100%',
}));

const ProjectTitle = styled(Text)(() => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const ActionButton = styled(Button)(() => ({
  height: 48,
  width: 48,
  background: 'transparent',

  ':hover': {
    background: '#339637',
    color: 'white',
  },
}));

const TextWrapper = styled('div')(() => ({
  minWidth: 1,
}));

const SECOND = 1e3;

const TrackerButton: FC<Props> = ({ projectId, projectTitle, startedAt, isActive }) => {
  const { toggleTracker } = useProjects();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [time, setTime] = useState('00:00');
  const renderedButtonIcon = isActive ? <PauseIcon /> : <PlayIcon />;

  const updateTimeLabel = useCallback(() => {
    if (!isActive) return null;

    const currentData = dayjs(new Date());
    const startDate = dayjs(startedAt);
    const diff = currentData.diff(startDate, 'hours', true);
    setTime(floatToTime(diff));
  }, [startedAt, isActive]);

  useEffect(() => {
    updateTimeLabel();
  }, [currentTime, updateTimeLabel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, SECOND);

    return () => {
      clearInterval(interval);
    };
  }, [updateTimeLabel]);

  return (
    <TrackerWrapper isActive={isActive} onClick={() => toggleTracker(projectId)}>
      <TextWrapper>
        <ProjectTitle fontWeight={800}>{projectTitle}</ProjectTitle>
        <Text>{isActive ? time : '00:00'}</Text>
      </TextWrapper>
      <ActionButton variant='ghost'>{renderedButtonIcon}</ActionButton>
    </TrackerWrapper>
  );
};

export default TrackerButton;
