import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import { useAuth } from 'controllers/auth/useAuth';
import useHoverState from 'hooks/useHoverState';

import LogoutIcon from './icons/LogoutIcon';

const LogoutWrapper = styled(Button)(`
    justify-content: flex-start;
    gap: 12px;
    padding: 12px;
    width: 100%;
    height: auto;
    border-radius: 32px;
`);

const Avatar = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 40,
  height: 40,
  background: '#3182ce',
  color: 'white',
}));

const LogoutButton = () => {
  const { signOut } = useAuth();
  const ref = useRef(null);
  const isHovered = useHoverState(ref);
  const renderedButtonText = isHovered ? <span>Logout</span> : <span>Alexey V.</span>;
  const renderedButtonIcon = isHovered ? <LogoutIcon /> : 'A';

  return (
    <LogoutWrapper onClick={signOut} ref={ref}>
      <Avatar>{renderedButtonIcon}</Avatar>
      {renderedButtonText}
    </LogoutWrapper>
  );
};

export default LogoutButton;
