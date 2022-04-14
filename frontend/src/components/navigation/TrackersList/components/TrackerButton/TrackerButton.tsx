import { Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';

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

  ':hover': {
    background: '#339637',
  },
}));

const TextWrapper = styled('div')(() => ({
  minWidth: 1,
}));

const TrackerButton: FC<Props> = ({ isActive }) => {
  return (
    <TrackerWrapper isActive={isActive}>
      <TextWrapper>
        <ProjectTitle fontWeight={800}>Default project</ProjectTitle>
        <Text>01:34:33</Text>
      </TextWrapper>
      <ActionButton variant='ghost'>+</ActionButton>
    </TrackerWrapper>
  );
};

export default TrackerButton;
