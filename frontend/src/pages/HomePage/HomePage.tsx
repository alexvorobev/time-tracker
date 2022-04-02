import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import MainLayout from '../../components/core/MainLayout';

const Graph = styled.div`
    width: 100%;
    padding-bottom: 480px;
    background-color: var(--internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59)));
    border-radius: 16px;
    margin-bottom: 24px;
`;

const HomePage = () => <MainLayout>
    <Graph />
    <Button variant='solid'>test</Button>
</MainLayout>

export default HomePage;