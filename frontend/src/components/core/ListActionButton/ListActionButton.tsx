import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

import ActionIcon from 'icons/ActionIcon';

const ActionButton = styled(Button)(() => ({
  background: 'none !important',
  color: '#DBDDE4',

  ':hover': {
    color: '#0073D0',
  },
}));

const ListActionButton = () => (
  <ActionButton variant='ghost'>
    <ActionIcon />
  </ActionButton>
);

export default ListActionButton;
