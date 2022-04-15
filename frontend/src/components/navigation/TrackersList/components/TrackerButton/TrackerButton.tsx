import { FC } from 'react';
import { Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/StopIcon';

interface Props {
  isActive?: boolean;
}

const TrackerWrapper = styled('div')<Props>(({ isActive }) => ({
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

const TrackerButton: FC<Props> = ({ isActive }) => {
  const renderedButtonIcon = !isActive ? <PlayIcon /> : <PauseIcon />;

  return (
    <TrackerWrapper isActive={isActive}>
      <TextWrapper>
        <ProjectTitle fontWeight={800}>Default project</ProjectTitle>
        <Text>00:15</Text>
      </TextWrapper>
      <ActionButton variant='ghost'>{renderedButtonIcon}</ActionButton>
    </TrackerWrapper>
  );
};

export default TrackerButton;
