import styled from '@emotion/styled';

import WeeksList from 'components/WeeksList';
import { weeksMock } from 'components/WeeksList/mocks/data';

const Graph = styled.div`
  width: 100%;
  padding-bottom: 480px;
  background-color: #f6f6f6;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const HomePage = () => (
  <>
    <Graph />
    <WeeksList weeks={weeksMock} />
  </>
);

export default HomePage;
