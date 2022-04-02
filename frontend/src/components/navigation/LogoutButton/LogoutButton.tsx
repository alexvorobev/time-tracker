import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const LogoutWrapper = styled(Button)(`
    justify-content: flex-start;
    gap: 12px;
    padding: 12px;
    width: 100%;
    height: auto;
`);

const Avatar = styled.div`
    display: block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: #fff;
`;

const LogoutButton = () => <LogoutWrapper>
    <Avatar />
    <span>
        Alexey V.
    </span>
</LogoutWrapper>

export default LogoutButton;