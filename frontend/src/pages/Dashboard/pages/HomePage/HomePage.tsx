import styled from '@emotion/styled';
import { Tab, Tabs, TabList, Stack } from '@chakra-ui/react';

import FragmentsList from 'components/FragmentsList';
import data from 'components/FragmentsList/data.mock';

const Graph = styled.div`
  width: 100%;
  padding-bottom: 480px;
  background-color: #f6f6f6;
  border-radius: 16px;
  margin-bottom: 24px;
`;

const normalTabStyle = {
  border: '1px solid',
};

const hoverTabStyle = {
  ...normalTabStyle,
  background: 'gray.50',
  borderColor: 'gray.300',
};

const activeTabStyle = {
  ...hoverTabStyle,
  color: 'brand.700',
  borderColor: 'currentColor',

  ':hover': {
    borderColor: 'brand.700',
  },
};

const StyledTab = styled(Tab)(() => ({
  border: '1px solid transparent',
}));

const dateFilterItems = [
  {
    title: 'All',
  },
  {
    title: 'Today',
  },
  {
    title: 'This week',
  },
  {
    title: 'This month',
  },
];

const HomePage = () => {
  const renderedTimeFilter = (
    <Tabs size='sm' variant='soft-rounded'>
      <TabList gap={2}>
        {dateFilterItems.map(({ title }) => (
          <StyledTab key={title} __css={normalTabStyle} _selected={activeTabStyle} _hover={hoverTabStyle}>
            {title}
          </StyledTab>
        ))}
      </TabList>
    </Tabs>
  );

  return (
    <Stack spacing={8}>
      {renderedTimeFilter}
      <Graph />
      <FragmentsList fragments={data} />
    </Stack>
  );
};

export default HomePage;
