import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';

import TrackerButton from './components/TrackerButton';

const AddButton = styled(Button)(() => ({
  width: '100%',
  height: 40,
  position: 'absolute',
  left: 0,
  opacity: 0,
  bottom: 0,
  transition: '.3s opacity',
  zIndex: 1,
  maxWidth: '100%',
}));

const ListWrapper = styled('div')(() => ({
  position: 'relative',
  transition: '.6s padding',

  ':hover': {
    paddingBottom: 48,

    [`${AddButton}`]: {
      opacity: 1,
    },
  },
}));

const TrackersList = () => {
  return (
    <ListWrapper>
      <TrackerButton isActive />
      <AddButton disabled>Add tracker</AddButton>
    </ListWrapper>
  );
};

export default TrackersList;
