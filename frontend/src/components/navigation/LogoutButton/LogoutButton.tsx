import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import { useAuth } from 'controllers/auth/useAuth';
import useHoverState from 'hooks/useHoverState';

import LogoutIcon from './icons/LogoutIcon';

const LogoutWrapper = styled(Button)(() => ({
  display: 'flex',
  textAlign: 'left',
  justifyContent: 'flex-start',
  gap: 12,
  padding: 12,
  width: '100%',
  height: 'auto',
  borderRadius: 32,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Avatar = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flex: '0 0 40px',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 40,
  height: 40,
  background: '#3182ce',
  color: 'white',
}));

const UserName = styled('div')(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 1,
  flex: '1 1 100%',
}));

const LogoutButton = () => {
  const {
    signOut,
    userInfo: { firstName, lastName },
  } = useAuth();
  const ref = useRef(null);
  const isHovered = useHoverState(ref);
  const renderedButtonText = isHovered ? (
    <span>Logout</span>
  ) : (
    <UserName>
      {firstName} {lastName}
    </UserName>
  );
  const firstNameSymbol = firstName?.split('')[0];
  const renderedButtonIcon = isHovered ? <LogoutIcon /> : firstNameSymbol;

  return (
    <LogoutWrapper onClick={signOut} ref={ref}>
      <Avatar>{renderedButtonIcon}</Avatar>
      {renderedButtonText}
    </LogoutWrapper>
  );
};

export default LogoutButton;
