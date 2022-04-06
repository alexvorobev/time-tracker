import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const LogoutWrapper = styled(Button)(`
    justify-content: flex-start;
    gap: 12px;
    padding: 12px;
    width: 100%;
    height: auto;
    border-radius: 32px;
`);

const Avatar = styled.div`
  display: block;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: #3182ce;
`;

const LogoutButton = () => (
  <LogoutWrapper>
    <Avatar />
    <span>Alexey V.</span>
  </LogoutWrapper>
);

export default LogoutButton;
