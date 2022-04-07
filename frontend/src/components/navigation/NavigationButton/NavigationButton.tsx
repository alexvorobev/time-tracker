import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

interface Props {
  icon?: JSX.Element;
  to: string;
}

const StyledButton = styled(Button)(`
    justify-content: flex-start;
    width: 100%;

    &:focus {
      box-shadow: none;
    }
`);

const NavigationButton: FC<Props> = ({ icon, children, to }) => (
  <NavLink to={to}>
    <StyledButton variant='ghost' leftIcon={icon} iconSpacing={3}>
      {children}
    </StyledButton>
  </NavLink>
);

export default NavigationButton;
