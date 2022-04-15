import { FC } from 'react';
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import styled from '@emotion/styled';

import ActionIcon from 'icons/ActionIcon';

const ActionButton = styled(MenuButton)(() => ({
  background: 'none !important',
  color: '#DBDDE4',

  ':hover': {
    color: '#0073D0',
  },
}));

const ListActionButton: FC = ({ children }) => (
  <Menu>
    <ActionButton as={IconButton} aria-label='Options' icon={<ActionIcon />} />
    <MenuList>{children}</MenuList>
  </Menu>
);

export default ListActionButton;
